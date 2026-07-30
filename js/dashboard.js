(function () {
  const AUTO_REFRESH_MS = 15000;
  let refreshInFlight = null;
  let refreshIntervalId = 0;

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function formatCurrency(value) {
    return `${formatNumber(Number(value || 0))} EGP`;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDateTime(value) {
    if (!value) return "No data yet";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No data yet";
    return date.toLocaleString();
  }

  function formatRelativeTime(value) {
    if (!value) return "just now";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "just now";

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.max(0, Math.round(diffMs / 60000));
    if (diffMinutes < 1) return "just now";
    if (diffMinutes === 1) return "1 min ago";
    if (diffMinutes < 60) return `${diffMinutes} mins ago`;

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  }

  function shortId(value) {
    const clean = String(value || "").trim();
    if (!clean) return "n/a";
    return clean.length <= 10 ? clean : clean.slice(-10);
  }

  function labelEvent(name) {
    const clean = String(name || "").trim();
    if (!clean) return "Unknown Event";

    const labels = {
      page_view: "Page View",
      product_view: "Product View",
      product_open: "Product Open",
      add_to_cart: "Add To Cart",
      buy_now: "Buy Now",
      begin_checkout: "Begin Checkout",
      payment_attempt: "Payment Attempt",
      order_completed: "Order Completed",
      account_register: "Account Register",
      account_login: "Account Login"
    };

    return labels[clean] || clean.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function getInventorySnapshot() {
    const brandCatalog = window.ovaBrandCatalog || {};
    const helperData = window.ovaDashboardInventory || {};
    const visibleBrandKeys = Array.isArray(helperData.visibleBrandKeys) && helperData.visibleBrandKeys.length
      ? helperData.visibleBrandKeys
      : Object.keys(brandCatalog);
    const namesMap = new Map();
    const brandStats = [];

    function ensureProduct(name) {
      const cleanName = String(name || "").trim();
      if (!cleanName) return null;

      if (!namesMap.has(cleanName)) {
        namesMap.set(cleanName, {
          name: cleanName,
          brands: new Set(),
          tags: new Set()
        });
      }

      return namesMap.get(cleanName);
    }

    visibleBrandKeys.forEach((brandKey) => {
      const brand = brandCatalog[brandKey];
      if (!brand) return;
      const products = Array.isArray(brand && brand.products) ? brand.products : [];
      brandStats.push({
        key: brandKey,
        title: brand && brand.title ? brand.title : brandKey,
        count: products.length
      });

      products.forEach((product) => {
        const entry = ensureProduct(product.name);
        if (!entry) return;
        entry.brands.add(brand && brand.title ? brand.title : brandKey);
        entry.tags.add("brand");
      });
    });

    (helperData.featuredProducts || []).forEach((name) => {
      const entry = ensureProduct(name);
      if (entry) entry.tags.add("featured");
    });

    (helperData.standaloneProducts || []).forEach((name) => {
      const entry = ensureProduct(name);
      if (entry) entry.tags.add("standalone");
    });

    (helperData.menProducts || []).forEach((name) => {
      const entry = ensureProduct(name);
      if (entry) entry.tags.add("men");
    });

    (helperData.womenProducts || []).forEach((name) => {
      const entry = ensureProduct(name);
      if (entry) entry.tags.add("women");
    });

    (helperData.unisexProducts || []).forEach((name) => {
      const entry = ensureProduct(name);
      if (entry) entry.tags.add("unisex");
    });

    return {
      totalProducts: namesMap.size,
      brandsCount: brandStats.length,
      brandStats: brandStats.sort((a, b) => b.count - a.count),
      featuredCount: (helperData.featuredProducts || []).length,
      standaloneCount: (helperData.standaloneProducts || []).length,
      menCount: (helperData.menProducts || []).length,
      womenCount: (helperData.womenProducts || []).length,
      unisexCount: (helperData.unisexProducts || []).length
    };
  }

  function emptyLiveSnapshot() {
    return {
      activeWindowMinutes: 5,
      recentWindowMinutes: 30,
      activeVisitorsNow: 0,
      activeSessionsNow: 0,
      activePagesNow: 0,
      eventsLast30Min: 0,
      pageViewsLast30Min: 0,
      eventMix: [],
      recentEvents: [],
      recentPages: [],
      recentSessions: []
    };
  }

  function createEmptyRemotePayload() {
    return {
      source: "disconnected",
      generatedAt: "",
      analytics: {
        totalVisitors: 0,
        totalSessions: 0,
        totalPageViews: 0,
        totalEvents: 0,
        firstVisitAt: "",
        lastVisitAt: "",
        events: {},
        pages: [],
        products: [],
        daily: [],
        signups: 0,
        live: emptyLiveSnapshot()
      },
      orders: {
        totalOrders: 0,
        revenue: 0,
        unitsSold: 0,
        uniqueCustomers: 0,
        averageOrder: 0,
        emailSent: 0,
        emailPending: 0,
        emailFailed: 0,
        topProducts: []
      }
    };
  }

  async function getRemoteStats() {
    try {
      const response = await fetch("/.netlify/functions/dashboard-stats", {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      });

      if (!response.ok) return createEmptyRemotePayload();
      const payload = await response.json();
      if (!payload || payload.ok !== true) return createEmptyRemotePayload();
      return {
        source: "live",
        generatedAt: payload.generatedAt || "",
        analytics: {
          ...createEmptyRemotePayload().analytics,
          ...(payload.analytics || {}),
          live: payload.analytics && payload.analytics.live ? payload.analytics.live : emptyLiveSnapshot()
        },
        orders: {
          ...createEmptyRemotePayload().orders,
          ...(payload.orders || {})
        }
      };
    } catch (error) {
      return createEmptyRemotePayload();
    }
  }

  function renderMetricCards(inventory, orders, analytics) {
    const root = document.getElementById("metricCards");
    const cards = [
      { label: "Unique Visitors", value: formatNumber(analytics.totalVisitors || analytics.totalSessions), note: analytics.source === "live" ? "Real visitors tracked from the live site" : "Waiting for live tracking connection" },
      { label: "Sessions", value: formatNumber(analytics.totalSessions), note: "Tracked browsing sessions" },
      { label: "Page Views", value: formatNumber(analytics.totalPageViews), note: `${formatNumber(analytics.totalEvents || 0)} total tracked events` },
      { label: "Products", value: formatNumber(inventory.totalProducts), note: `${inventory.brandsCount} brands connected` },
      { label: "Registered Users", value: formatNumber(analytics.signups || 0), note: analytics.source === "live" ? "Tracked account registrations" : "Live signup tracking will appear here" },
      { label: "Orders", value: formatNumber(orders.totalOrders), note: `${formatNumber(orders.unitsSold)} units sold` },
      { label: "Revenue", value: formatCurrency(orders.revenue), note: `Avg order ${formatCurrency(orders.averageOrder)}` },
      { label: "Events 30 Min", value: formatNumber((analytics.live || emptyLiveSnapshot()).eventsLast30Min), note: "Fresh live actions from the website" },
      { label: "Unique Customers", value: formatNumber(orders.uniqueCustomers), note: analytics.source === "live" ? "Based on live completed orders" : "Will populate after live orders start again" }
    ];

    root.innerHTML = cards.map((card) => `
      <article class="metric-card ova-reveal">
        <span class="metric-label">${card.label}</span>
        <strong class="metric-value">${card.value}</strong>
        <p class="metric-note">${card.note}</p>
      </article>
    `).join("");
  }

  function renderLiveStatus(analytics) {
    const root = document.getElementById("liveStatus");
    const live = analytics.live || emptyLiveSnapshot();
    const statusItems = [
      analytics.source === "live"
        ? `<span class="status-pill"><span class="pulse-dot"></span>Live sync connected</span>`
        : `<span class="status-pill"><span class="pulse-dot"></span>Live sync disconnected</span>`,
      `<span class="status-pill">Auto refresh every <strong>${Math.round(AUTO_REFRESH_MS / 1000)}s</strong></span>`,
      analytics.generatedAt
        ? `<span class="status-pill">Last sync <strong>${escapeHtml(formatRelativeTime(analytics.generatedAt))}</strong></span>`
        : `<span class="status-pill">Last sync <strong>no live data yet</strong></span>`,
      `<span class="status-pill">Active window <strong>${formatNumber(live.activeWindowMinutes || 5)} min</strong></span>`
    ];

    root.innerHTML = statusItems.join("");
  }

  function renderLivePulse(analytics) {
    const root = document.getElementById("livePulseStats");
    const mixRoot = document.getElementById("eventMix");
    const live = analytics.live || emptyLiveSnapshot();
    const cards = [
      {
        label: "Active Visitors Now",
        value: formatNumber(live.activeVisitorsNow),
        note: `${formatNumber(live.activePagesNow)} pages touched in the last ${formatNumber(live.activeWindowMinutes || 5)} minutes`
      },
      {
        label: "Active Sessions Now",
        value: formatNumber(live.activeSessionsNow),
        note: "Latest sessions still interacting with the website"
      },
      {
        label: `Events Last ${formatNumber(live.recentWindowMinutes || 30)} Min`,
        value: formatNumber(live.eventsLast30Min),
        note: "Fresh clicks, opens, and actions coming from the live store"
      },
      {
        label: `Page Views Last ${formatNumber(live.recentWindowMinutes || 30)} Min`,
        value: formatNumber(live.pageViewsLast30Min),
        note: analytics.generatedAt ? `Synced ${escapeHtml(formatRelativeTime(analytics.generatedAt))}` : "Will update automatically after deployment"
      }
    ];

    root.innerHTML = cards.map((item) => `
      <div class="mini-stat ova-reveal">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <div class="feed-time">${item.note}</div>
      </div>
    `).join("");

    mixRoot.innerHTML = Array.isArray(live.eventMix) && live.eventMix.length
      ? live.eventMix.map((item) => `
          <div class="signal-pill ova-reveal">
            <span>${escapeHtml(labelEvent(item.name))}</span>
            <strong>${formatNumber(item.count)}</strong>
          </div>
        `).join("")
      : '<p class="empty-copy">Live event mix will appear here when the deployed site sends traffic.</p>';
  }

  function renderLiveFeeds(analytics) {
    const live = analytics.live || emptyLiveSnapshot();
    const sessionsRoot = document.getElementById("recentSessions");
    const eventsRoot = document.getElementById("recentEvents");
    const pagesRoot = document.getElementById("recentPages");

    sessionsRoot.innerHTML = Array.isArray(live.recentSessions) && live.recentSessions.length
      ? live.recentSessions.map((session) => `
          <div class="feed-row ova-reveal">
            <div class="feed-top">
              <div class="feed-main">
                <strong>${escapeHtml(session.lastTitle || session.lastPage || "Recent session")}</strong>
                <span>${escapeHtml(session.lastPath || session.lastPage || "Unknown page")}</span>
              </div>
              <span class="feed-badge${session.isActive ? " is-live" : ""}">${session.isActive ? "Active" : "Idle"}</span>
            </div>
            <div class="feed-meta">
              <span>event: ${escapeHtml(labelEvent(session.lastEventName))}</span>
              <span>events: ${formatNumber(session.eventCount)}</span>
              <span>pages: ${formatNumber(session.pageCount)}</span>
              <span>visitor: ${escapeHtml(shortId(session.visitorId))}</span>
            </div>
            <div class="feed-time">Last seen ${escapeHtml(formatRelativeTime(session.lastSeenAt))}</div>
          </div>
        `).join("")
      : '<p class="empty-copy">Recent visitor sessions will appear here once live traffic reaches the deployed site.</p>';

    eventsRoot.innerHTML = Array.isArray(live.recentEvents) && live.recentEvents.length
      ? live.recentEvents.map((item) => `
          <div class="feed-row ova-reveal">
            <div class="feed-top">
              <div class="feed-main">
                <strong>${escapeHtml(labelEvent(item.eventName))}</strong>
                <span>${escapeHtml(item.productName || item.title || item.page || "Store activity")}</span>
              </div>
              <span class="feed-badge">${escapeHtml(item.page || "site")}</span>
            </div>
            <div class="feed-meta">
              <span>visitor: ${escapeHtml(shortId(item.visitorId))}</span>
              <span>session: ${escapeHtml(shortId(item.sessionId))}</span>
              ${item.path ? `<span>path: ${escapeHtml(item.path)}</span>` : ""}
            </div>
            <div class="feed-time">${escapeHtml(formatRelativeTime(item.createdAt))}</div>
          </div>
        `).join("")
      : '<p class="empty-copy">Latest actions like page views, add to cart, checkout, and orders will appear here.</p>';

    pagesRoot.innerHTML = Array.isArray(live.recentPages) && live.recentPages.length
      ? live.recentPages.map((item) => `
          <div class="feed-row ova-reveal">
            <div class="feed-top">
              <div class="feed-main">
                <strong>${escapeHtml(item.title || item.page || "Page View")}</strong>
                <span>${escapeHtml(item.path || item.page || "/")}</span>
              </div>
              <span class="feed-badge is-live">Page</span>
            </div>
            <div class="feed-meta">
              <span>visitor: ${escapeHtml(shortId(item.visitorId))}</span>
              <span>session: ${escapeHtml(shortId(item.sessionId))}</span>
            </div>
            <div class="feed-time">${escapeHtml(formatRelativeTime(item.createdAt))}</div>
          </div>
        `).join("")
      : '<p class="empty-copy">Newest page openings from the live website will appear here.</p>';
  }

  function renderActivity(series) {
    const root = document.getElementById("activityRows");
    const maxViews = Math.max(1, ...series.rows.map((row) => row.views));
    const maxSessions = Math.max(1, ...series.rows.map((row) => row.sessions));
    const maxOrders = Math.max(1, ...series.rows.map((row) => row.orders));

    root.innerHTML = series.rows.map((row) => `
      <div class="activity-row ova-reveal">
        <div class="activity-day">${row.label}</div>
        <div class="activity-bars">
          <div class="bar-set">
            <span>Views</span>
            <div class="bar-track"><div class="bar-fill gold" style="width:${(row.views / maxViews) * 100}%"></div></div>
            <strong>${formatNumber(row.views)}</strong>
          </div>
          <div class="bar-set">
            <span>Sessions</span>
            <div class="bar-track"><div class="bar-fill sand" style="width:${(row.sessions / maxSessions) * 100}%"></div></div>
            <strong>${formatNumber(row.sessions)}</strong>
          </div>
          <div class="bar-set">
            <span>Orders</span>
            <div class="bar-track"><div class="bar-fill dark" style="width:${(row.orders / maxOrders) * 100}%"></div></div>
            <strong>${formatNumber(row.orders)}</strong>
          </div>
        </div>
        <div class="activity-revenue">${formatCurrency(row.revenue)}</div>
      </div>
    `).join("");
  }

  function renderCatalog(inventory) {
    const quickStats = document.getElementById("catalogQuickStats");
    const brands = document.getElementById("brandBreakdown");

    quickStats.innerHTML = [
      { label: "Men", value: inventory.menCount },
      { label: "Women", value: inventory.womenCount },
      { label: "Unisex", value: inventory.unisexCount },
      { label: "Featured", value: inventory.featuredCount },
      { label: "Standalone", value: inventory.standaloneCount }
    ].map((item) => `
      <div class="mini-stat ova-reveal">
        <span>${item.label}</span>
        <strong>${formatNumber(item.value)}</strong>
      </div>
    `).join("");

    brands.innerHTML = inventory.brandStats.map((brand) => `
      <div class="brand-pill ova-reveal">
        <span>${escapeHtml(brand.title)}</span>
        <strong>${formatNumber(brand.count)}</strong>
      </div>
    `).join("");
  }

  function renderCommerce(orders, analytics) {
    const root = document.getElementById("commerceStats");
    const event = (name) => Number((analytics.events || {})[name] || 0);
    const items = [
      { label: "Add To Cart Clicks", value: formatNumber(event("add_to_cart")) },
      { label: "Buy Now Clicks", value: formatNumber(event("buy_now")) },
      { label: "Checkout Starts", value: formatNumber(event("begin_checkout")) },
      { label: "Payment Attempts", value: formatNumber(event("payment_attempt")) },
      { label: "Email Sent", value: formatNumber(orders.emailSent) },
      { label: "Email Pending / Failed", value: `${formatNumber(orders.emailPending)} / ${formatNumber(orders.emailFailed)}` },
      { label: "Active Visitors Now", value: formatNumber((analytics.live || emptyLiveSnapshot()).activeVisitorsNow) },
      { label: "Active Sessions Now", value: formatNumber((analytics.live || emptyLiveSnapshot()).activeSessionsNow) }
    ];

    root.innerHTML = items.map((item) => `
      <div class="mini-stat ova-reveal">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `).join("");
  }

  function renderTopLists(orders, analytics) {
    const ordersRoot = document.getElementById("topOrderedProducts");
    const pagesRoot = document.getElementById("topPages");
    const engagementRoot = document.getElementById("topEngagementProducts");

    ordersRoot.innerHTML = orders.topProducts.length
      ? orders.topProducts.map((product) => `
          <div class="list-row ova-reveal">
            <div>
              <strong>${escapeHtml(product.name)}</strong>
              <span>${formatCurrency(product.revenue)}</span>
            </div>
            <b>${formatNumber(product.quantity)} pcs</b>
          </div>
        `).join("")
      : '<p class="empty-copy">No orders recorded yet.</p>';

    pagesRoot.innerHTML = analytics.pages.length
      ? analytics.pages.map((page) => `
          <div class="list-row ova-reveal">
            <div>
              <strong>${escapeHtml(page.page)}</strong>
              <span>${escapeHtml(page.title || page.page)}</span>
            </div>
            <b>${formatNumber(page.views)} views</b>
          </div>
        `).join("")
      : '<p class="empty-copy">Page tracking will appear here after browsing.</p>';

    engagementRoot.innerHTML = analytics.products.length
      ? analytics.products.map((product) => `
          <div class="list-row ova-reveal">
            <div>
              <strong>${escapeHtml(product.name)}</strong>
              <span>${formatNumber(product.views)} views, ${formatNumber(product.cartAdds)} cart adds</span>
            </div>
            <b>${formatNumber(product.orderedUnits)} sold</b>
          </div>
        `).join("")
      : '<p class="empty-copy">Product engagement data will build automatically as visitors interact.</p>';
  }

  function renderMeta(analytics) {
    const firstVisit = formatDateTime(analytics.firstVisitAt);
    const lastVisit = formatDateTime(analytics.lastVisitAt);
    const generatedAt = analytics.generatedAt ? formatDateTime(analytics.generatedAt) : "Waiting for live sync";
    document.getElementById("metaInfo").innerHTML = `
      <span>Data source: <strong>${analytics.source === "live" ? "Live Netlify + Supabase" : "No live connection yet"}</strong></span>
      <span>Mode: <strong>${analytics.source === "live" ? "Live only" : "Disconnected / zeroed state"}</strong></span>
      <span>First tracked visit: <strong>${escapeHtml(firstVisit)}</strong></span>
      <span>Last tracked visit: <strong>${escapeHtml(lastVisit)}</strong></span>
      <span>Last dashboard sync: <strong>${escapeHtml(generatedAt)}</strong></span>
      <span>${analytics.source === "live" ? "Every new visitor on the deployed website can appear here automatically." : "This dashboard now stays at zero until the live backend responds successfully."}</span>
    `;
  }

  async function resetLiveDashboard() {
    const resetButton = document.querySelector("[data-reset-live-dashboard]");
    const originalButtonText = resetButton ? resetButton.textContent : "";

    if (resetButton) {
      resetButton.disabled = true;
      resetButton.textContent = "Resetting...";
    }

    try {
      const response = await fetch("/.netlify/functions/dashboard-reset", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload || payload.ok !== true) {
        throw new Error(payload && payload.error ? payload.error : "Reset failed");
      }

      ["ovaAnalytics", "ovaAnalyticsSession", "ovaOrders", "ovaUsers", "ovaCart"].forEach((key) => {
        try {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        } catch (error) {
          // Ignore local cleanup issues.
        }
      });

      await refreshDashboard();
    } finally {
      if (resetButton) {
        resetButton.disabled = false;
        resetButton.textContent = originalButtonText || "Reset Live Data";
      }
    }
  }

  async function refreshDashboard() {
    if (refreshInFlight) return refreshInFlight;

    const refreshButton = document.querySelector("[data-refresh-dashboard]");
    const originalButtonText = refreshButton ? refreshButton.textContent : "";

    if (refreshButton) {
      refreshButton.disabled = true;
      refreshButton.textContent = "Refreshing...";
    }

    refreshInFlight = (async () => {
      const inventory = getInventorySnapshot();
      const remote = await getRemoteStats();
      const analytics = {
        ...(remote.analytics || createEmptyRemotePayload().analytics),
        source: remote.source || "disconnected",
        generatedAt: remote.generatedAt || "",
        live: remote.analytics && remote.analytics.live ? remote.analytics.live : emptyLiveSnapshot()
      };
      const orders = {
        ...createEmptyRemotePayload().orders,
        ...(remote.orders || {})
      };
      const series = { rows: Array.isArray(analytics.daily) ? analytics.daily : [] };

      renderMetricCards(inventory, orders, analytics);
      renderLiveStatus(analytics);
      renderLivePulse(analytics);
      renderLiveFeeds(analytics);
      renderActivity(series);
      renderCatalog(inventory);
      renderCommerce(orders, analytics);
      renderTopLists(orders, analytics);
      renderMeta(analytics);

      if (window.refreshOvaScrollReveal) {
        window.refreshOvaScrollReveal();
      }
    })();

    try {
      await refreshInFlight;
    } finally {
      refreshInFlight = null;
      if (refreshButton) {
        refreshButton.disabled = false;
        refreshButton.textContent = originalButtonText || "Refresh Data";
      }
    }
  }

  function startAutoRefresh() {
    if (refreshIntervalId) return;
    refreshIntervalId = window.setInterval(() => {
      refreshDashboard();
    }, AUTO_REFRESH_MS);
  }

  window.addEventListener("load", () => {
    refreshDashboard();
    startAutoRefresh();
  });

  document.addEventListener("click", (event) => {
    const refreshButton = event.target.closest("[data-refresh-dashboard]");
    if (!refreshButton) return;
    refreshDashboard();
  });

  document.addEventListener("click", (event) => {
    const resetButton = event.target.closest("[data-reset-live-dashboard]");
    if (!resetButton) return;

    const confirmed = window.confirm("Reset all live dashboard data and start again from zero?");
    if (!confirmed) return;
    resetLiveDashboard().catch(() => {
      window.alert("Live reset failed. Check Netlify function environment variables and deployment.");
    });
  });
})();
