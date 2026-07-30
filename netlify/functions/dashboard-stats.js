const {
  TABLE_NAME,
  jsonResponse,
  supabaseFetch,
  requireSupabaseConfig
} = require("./_supabase");

async function fetchAllEvents() {
  const pageSize = 1000;
  const maxRows = 20000;
  const rows = [];

  for (let start = 0; start < maxRows; start += pageSize) {
    const end = start + pageSize - 1;
    let payload;

    try {
      const response = await supabaseFetch(
        `/rest/v1/${TABLE_NAME}`,
        {
          method: "GET",
          headers: {
            Range: `${start}-${end}`
          }
        },
        {
          select: "event_name,page,product_name,session_id,visitor_id,order_id,payload,created_at",
          order: "created_at.asc"
        }
      );
      payload = response.payload;
    } catch (error) {
      // Supabase/PostgREST may return 416 when the requested range starts past the final row.
      // Treat that as a normal end-of-data signal instead of failing the whole dashboard.
      if (error && Number(error.status) === 416) {
        break;
      }
      throw error;
    }

    const batch = Array.isArray(payload) ? payload : [];
    rows.push(...batch);

    if (batch.length < pageSize) {
      break;
    }
  }

  return rows;
}

function formatDayKey(value) {
  const date = new Date(value || Date.now());
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(safeDate);
  const year = parts.find((part) => part.type === "year")?.value || "0000";
  const month = parts.find((part) => part.type === "month")?.value || "00";
  const day = parts.find((part) => part.type === "day")?.value || "00";
  return `${year}-${month}-${day}`;
}

function recentSevenDays() {
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - offset);
    days.push(formatDayKey(date));
  }
  return days;
}

function getProductBucket(map, name) {
  const key = String(name || "").trim();
  if (!key) return null;

  if (!map[key]) {
    map[key] = {
      name: key,
      views: 0,
      cartAdds: 0,
      buyNowClicks: 0,
      orderedUnits: 0,
      revenue: 0,
      quantity: 0
    };
  }

  return map[key];
}

function getPageBucket(map, page) {
  const key = String(page || "unknown").trim() || "unknown";
  if (!map[key]) {
    map[key] = {
      page: key,
      title: key,
      views: 0,
      sessions: 0,
      sessionIds: new Set(),
      lastViewedAt: ""
    };
  }
  return map[key];
}

function getDailyBucket(map, dayKey) {
  if (!map[dayKey]) {
    map[dayKey] = {
      key: dayKey,
      views: 0,
      sessions: 0,
      sessionIds: new Set(),
      visitorKeys: new Set(),
      orders: 0,
      revenue: 0,
      unitsSold: 0,
      events: 0
    };
  }
  return map[dayKey];
}

function parseTimestamp(value) {
  const timestamp = new Date(value || "").getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function createSessionBucket(key, row, eventName, payload) {
  return {
    key,
    sessionId: row.session_id || "",
    visitorId: row.visitor_id || "",
    firstSeenAt: row.created_at || "",
    lastSeenAt: row.created_at || "",
    lastPage: row.page || payload.path || "",
    lastPath: payload.path || "",
    lastTitle: payload.title || row.page || "",
    lastEventName: eventName || "",
    eventCount: 0,
    pages: new Set()
  };
}

function getSessionBucket(map, row, eventName, payload) {
  const key = String(row.session_id || row.visitor_id || "").trim();
  if (!key) return null;

  if (!map[key]) {
    map[key] = createSessionBucket(key, row, eventName, payload);
  }

  return map[key];
}

function recentRows(rows, limit, filterFn) {
  const list = [];
  for (let index = rows.length - 1; index >= 0 && list.length < limit; index -= 1) {
    const row = rows[index];
    if (typeof filterFn === "function" && !filterFn(row)) continue;
    list.push(row);
  }
  return list;
}

function normalizeOrderItems(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const quantity = Number(item.quantity || item.qty || 0);
      const price = Number(item.price || 0);
      const subtotal = Number(item.subtotal || quantity * price);
      return {
        name: String(item.name || "").trim(),
        quantity,
        price,
        subtotal
      };
    })
    .filter((item) => item.name);
}

const ACTIVE_WINDOW_MINUTES = 5;
const RECENT_WINDOW_MINUTES = 30;
const ACTIVE_WINDOW_MS = ACTIVE_WINDOW_MINUTES * 60 * 1000;
const RECENT_WINDOW_MS = RECENT_WINDOW_MINUTES * 60 * 1000;
const HIDDEN_FEED_EVENTS = new Set(["heartbeat"]);

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingConfig = requireSupabaseConfig();
  if (missingConfig) return missingConfig;

  try {
    const rows = await fetchAllEvents();
    const visitorKeys = new Set();
    const sessionIds = new Set();
    const customerKeys = new Set();
    const processedOrders = new Set();
    const eventCounts = {};
    const pages = {};
    const products = {};
    const sessions = {};
    const daily = {};
    const recentOrders = [];
    const sevenDays = recentSevenDays();
    const signups = { total: 0 };
    const now = Date.now();
    const todayKey = formatDayKey(now);

    let firstVisitAt = rows[0] ? rows[0].created_at : "";
    let lastVisitAt = rows.length ? rows[rows.length - 1].created_at : "";
    let totalPageViews = 0;
    let totalOrders = 0;
    let totalRevenue = 0;
    let totalUnitsSold = 0;
    let eventsLast30Min = 0;
    let pageViewsLast30Min = 0;

    sevenDays.forEach((dayKey) => {
      getDailyBucket(daily, dayKey);
    });

    rows.forEach((row) => {
      const eventName = String(row.event_name || "").trim();
      const dayKey = formatDayKey(row.created_at);
      const payload = row.payload && typeof row.payload === "object" ? row.payload : {};
      const dailyBucket = getDailyBucket(daily, dayKey);
      const createdAtTs = parseTimestamp(row.created_at);
      const isRecentEvent = createdAtTs && createdAtTs >= now - RECENT_WINDOW_MS;
      const sessionBucket = getSessionBucket(sessions, row, eventName, payload);

      const visitorKey = String(row.visitor_id || row.session_id || "").trim();
      if (visitorKey) {
        visitorKeys.add(visitorKey);
        dailyBucket.visitorKeys.add(visitorKey);
      }
      if (row.session_id) {
        sessionIds.add(String(row.session_id));
        dailyBucket.sessionIds.add(String(row.session_id));
      }

      if (eventName) {
        eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
        dailyBucket.events += 1;
      }

      if (sessionBucket) {
        sessionBucket.eventCount += 1;
        sessionBucket.lastEventName = eventName || sessionBucket.lastEventName;
        sessionBucket.lastSeenAt = row.created_at || sessionBucket.lastSeenAt;
        sessionBucket.lastPage = row.page || payload.path || sessionBucket.lastPage;
        sessionBucket.lastPath = payload.path || sessionBucket.lastPath;
        sessionBucket.lastTitle = payload.title || sessionBucket.lastTitle || row.page || sessionBucket.lastPage;
        if (row.page) sessionBucket.pages.add(String(row.page));
      }

      if (isRecentEvent) {
        eventsLast30Min += 1;
      }

      if (eventName === "page_view") {
        totalPageViews += 1;
        dailyBucket.views += 1;
        if (isRecentEvent) pageViewsLast30Min += 1;
        const pageBucket = getPageBucket(pages, row.page);
        pageBucket.views += 1;
        pageBucket.title = payload.title || pageBucket.title || row.page;
        pageBucket.lastViewedAt = row.created_at || pageBucket.lastViewedAt;
        if (row.session_id) {
          pageBucket.sessionIds.add(String(row.session_id));
        }
      }

      if (eventName === "account_register") {
        signups.total += 1;
      }

      if (eventName === "product_view") {
        const productBucket = getProductBucket(products, row.product_name);
        if (productBucket) productBucket.views += 1;
      }

      if (eventName === "add_to_cart") {
        const productBucket = getProductBucket(products, row.product_name);
        if (productBucket) productBucket.cartAdds += 1;
      }

      if (eventName === "buy_now") {
        const productBucket = getProductBucket(products, row.product_name);
        if (productBucket) productBucket.buyNowClicks += 1;
      }

      if (eventName === "order_completed") {
        const orderKey = String(row.order_id || payload.orderId || "").trim();
        if (!orderKey || processedOrders.has(orderKey)) return;

        processedOrders.add(orderKey);
        totalOrders += 1;
        const orderRevenue = Number(payload.totalPrice || payload.total_price || 0);
        totalRevenue += orderRevenue;
        dailyBucket.orders += 1;
        dailyBucket.revenue += orderRevenue;
        const customerName = String(payload.customerName || payload.fullName || payload.name || "").trim();
        const address = String(payload.address || payload.addressLine || "").trim();
        const city = String(payload.city || "").trim();
        const country = String(payload.country || "").trim();
        const fullAddress = String(payload.fullAddress || [address, city, country].filter(Boolean).join(", ")).trim();

        const customerKey = String(payload.email || payload.phone || row.visitor_id || "").trim().toLowerCase();
        if (customerKey) customerKeys.add(customerKey);

        const items = normalizeOrderItems(payload.items);
        let orderUnits = 0;
        items.forEach((item) => {
          const productBucket = getProductBucket(products, item.name || row.product_name);
          if (!productBucket) return;

          const quantity = Number(item.quantity || 0);
          const subtotal = Number(item.subtotal || quantity * Number(item.price || 0));
          productBucket.orderedUnits += quantity;
          productBucket.quantity += quantity;
          productBucket.revenue += subtotal;
          totalUnitsSold += quantity;
          orderUnits += quantity;
        });

        dailyBucket.unitsSold += orderUnits;
        recentOrders.push({
          orderId: orderKey,
          createdAt: row.created_at || "",
          totalPrice: orderRevenue,
          customerName,
          email: String(payload.email || "").trim(),
          phone: String(payload.phone || "").trim(),
          paymentMethod: String(payload.paymentMethod || "").trim(),
          address,
          city,
          country,
          fullAddress,
          visitorId: row.visitor_id || "",
          sessionId: row.session_id || "",
          items
        });
      }
    });

    const pageList = Object.values(pages)
      .map((page) => ({
        page: page.page,
        title: page.title,
        views: page.views,
        sessions: page.sessionIds.size,
        lastViewedAt: page.lastViewedAt
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    const topProducts = Object.values(products)
      .sort((a, b) => b.quantity - a.quantity || b.revenue - a.revenue)
      .slice(0, 8)
      .map((product) => ({
        name: product.name,
        quantity: product.quantity,
        revenue: product.revenue
      }));

    const engagementProducts = Object.values(products)
      .sort((a, b) => {
        const scoreA = a.views + a.cartAdds + a.buyNowClicks + a.orderedUnits;
        const scoreB = b.views + b.cartAdds + b.buyNowClicks + b.orderedUnits;
        return scoreB - scoreA;
      })
      .slice(0, 8)
      .map((product) => ({
        name: product.name,
        views: product.views,
        cartAdds: product.cartAdds,
        buyNowClicks: product.buyNowClicks,
        orderedUnits: product.orderedUnits
      }));

    const dailySeries = sevenDays.map((dayKey) => {
      const bucket = getDailyBucket(daily, dayKey);
      return {
        key: bucket.key,
        label: bucket.key.slice(5),
        visitors: bucket.visitorKeys.size,
        views: bucket.views,
        sessions: bucket.sessionIds.size,
        orders: bucket.orders,
        revenue: bucket.revenue,
        unitsSold: bucket.unitsSold,
        events: bucket.events
      };
    });

    const recentEventRows = recentRows(rows, 12, (row) => !HIDDEN_FEED_EVENTS.has(String(row.event_name || "").trim()));
    const recentPageRows = recentRows(rows, 8, (row) => String(row.event_name || "").trim() === "page_view");
    const sessionList = Object.values(sessions)
      .sort((a, b) => parseTimestamp(b.lastSeenAt) - parseTimestamp(a.lastSeenAt));
    const activeSessions = sessionList.filter((session) => parseTimestamp(session.lastSeenAt) >= now - ACTIVE_WINDOW_MS);
    const activeVisitors = new Set(activeSessions.map((session) => session.visitorId || session.sessionId || session.key).filter(Boolean));
    const activePages = new Set(activeSessions.map((session) => session.lastPage).filter(Boolean));
    const eventMix = Object.entries(eventCounts)
      .filter(([name]) => !HIDDEN_FEED_EVENTS.has(String(name || "").trim()))
      .map(([name, count]) => ({ name, count: Number(count || 0) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
    const todayBucket = getDailyBucket(daily, todayKey);
    const sortedRecentOrders = recentOrders
      .sort((a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt))
      .slice(0, 12);

    return jsonResponse(200, {
      ok: true,
      source: "live",
      generatedAt: new Date().toISOString(),
      analytics: {
        timezone: "Africa/Cairo",
        totalVisitors: visitorKeys.size,
        totalSessions: sessionIds.size,
        totalPageViews,
        totalEvents: rows.length,
        firstVisitAt,
        lastVisitAt,
        events: eventCounts,
        pages: pageList,
        products: engagementProducts,
        daily: dailySeries,
        signups: signups.total,
        today: {
          key: todayKey,
          visitors: todayBucket.visitorKeys.size,
          sessions: todayBucket.sessionIds.size,
          pageViews: todayBucket.views,
          orders: todayBucket.orders,
          revenue: todayBucket.revenue,
          unitsSold: todayBucket.unitsSold,
          events: todayBucket.events
        },
        live: {
          activeWindowMinutes: ACTIVE_WINDOW_MINUTES,
          recentWindowMinutes: RECENT_WINDOW_MINUTES,
          activeVisitorsNow: activeVisitors.size,
          activeSessionsNow: activeSessions.length,
          activePagesNow: activePages.size,
          eventsLast30Min,
          pageViewsLast30Min,
          eventMix,
          recentEvents: recentEventRows.map((row) => {
            const payload = row.payload && typeof row.payload === "object" ? row.payload : {};
            return {
              eventName: row.event_name || "",
              page: row.page || "",
              productName: row.product_name || "",
              visitorId: row.visitor_id || "",
              sessionId: row.session_id || "",
              orderId: row.order_id || "",
              createdAt: row.created_at || "",
              title: payload.title || "",
              path: payload.path || "",
              referrer: payload.referrer || ""
            };
          }),
          recentPages: recentPageRows.map((row) => {
            const payload = row.payload && typeof row.payload === "object" ? row.payload : {};
            return {
              page: row.page || "",
              title: payload.title || row.page || "",
              path: payload.path || "",
              visitorId: row.visitor_id || "",
              sessionId: row.session_id || "",
              createdAt: row.created_at || ""
            };
          }),
          recentSessions: sessionList.slice(0, 10).map((session) => ({
            sessionId: session.sessionId || session.key,
            visitorId: session.visitorId || "",
            firstSeenAt: session.firstSeenAt,
            lastSeenAt: session.lastSeenAt,
            lastPage: session.lastPage,
            lastPath: session.lastPath,
            lastTitle: session.lastTitle,
            lastEventName: session.lastEventName,
            eventCount: session.eventCount,
            pageCount: session.pages.size,
            isActive: parseTimestamp(session.lastSeenAt) >= now - ACTIVE_WINDOW_MS
          }))
        }
      },
      orders: {
        totalOrders,
        revenue: totalRevenue,
        unitsSold: totalUnitsSold,
        uniqueCustomers: customerKeys.size,
        averageOrder: totalOrders ? totalRevenue / totalOrders : 0,
        emailSent: 0,
        emailPending: 0,
        emailFailed: 0,
        topProducts,
        today: {
          key: todayKey,
          totalOrders: todayBucket.orders,
          revenue: todayBucket.revenue,
          unitsSold: todayBucket.unitsSold
        },
        recentOrders: sortedRecentOrders
      }
    });
  } catch (error) {
    return jsonResponse(502, {
      ok: false,
      error: "Failed to build dashboard stats",
      details: error.payload || String(error.message || error)
    });
  }
};
