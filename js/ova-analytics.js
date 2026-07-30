(function () {
  const STORAGE_KEY = "ovaAnalytics";
  const SESSION_KEY = "ovaAnalyticsSession";
  const VISITOR_KEY = "ovaAnalyticsVisitorId";
  const REMOTE_ENDPOINT = "/.netlify/functions/track";
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  const MAX_TRACKED_ORDERS = 400;
  const HEARTBEAT_INTERVAL_MS = 60 * 1000;
  let heartbeatIntervalId = 0;

  function nowIso() {
    return new Date().toISOString();
  }

  function todayKey(dateValue) {
    const date = dateValue ? new Date(dateValue) : new Date();
    if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
    return date.toISOString().slice(0, 10);
  }

  function safeParse(raw, fallback) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function safeLocalGet(key, fallbackValue) {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallbackValue : value;
    } catch (error) {
      return fallbackValue;
    }
  }

  function safeLocalSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function safeLocalRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Ignore storage access issues so tracking never breaks the page.
    }
  }

  function safeSessionGet(key, fallbackValue) {
    try {
      const value = sessionStorage.getItem(key);
      return value == null ? fallbackValue : value;
    } catch (error) {
      return fallbackValue;
    }
  }

  function safeSessionSet(key, value) {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function safeSessionRemove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      // Ignore storage access issues so tracking never breaks the page.
    }
  }

  function getDefaultStore() {
    return {
      version: 1,
      firstVisitAt: null,
      lastVisitAt: null,
      lastSessionAt: null,
      totalPageViews: 0,
      totalSessions: 0,
      pages: {},
      events: {},
      products: {},
      daily: {},
      trackedOrderIds: []
    };
  }

  function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function getVisitorId() {
    try {
      let visitorId = safeLocalGet(VISITOR_KEY, "");
      if (!visitorId) {
        visitorId = createId("visitor");
        safeLocalSet(VISITOR_KEY, visitorId);
      }
      return visitorId;
    } catch (error) {
      return createId("visitor");
    }
  }

  function getStore() {
    const base = getDefaultStore();
    const saved = safeParse(safeLocalGet(STORAGE_KEY, "null"), null);
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      pages: saved.pages && typeof saved.pages === "object" ? saved.pages : {},
      events: saved.events && typeof saved.events === "object" ? saved.events : {},
      products: saved.products && typeof saved.products === "object" ? saved.products : {},
      daily: saved.daily && typeof saved.daily === "object" ? saved.daily : {},
      trackedOrderIds: Array.isArray(saved.trackedOrderIds) ? saved.trackedOrderIds : []
    };
  }

  function saveStore(store) {
    if (!safeLocalSet(STORAGE_KEY, JSON.stringify(store))) {
      console.warn("Ova analytics could not be saved.");
    }
  }

  function getPageKey(explicitPage) {
    if (explicitPage) return explicitPage;

    const path = (window.location.pathname || "").split("/").filter(Boolean);
    return path[path.length - 1] || "index.html";
  }

  function ensurePageBucket(store, pageKey) {
    if (!store.pages[pageKey]) {
      store.pages[pageKey] = {
        views: 0,
        sessions: 0,
        lastViewedAt: null,
        title: ""
      };
    }
    return store.pages[pageKey];
  }

  function ensureDailyBucket(store, dateKey) {
    if (!store.daily[dateKey]) {
      store.daily[dateKey] = {
        views: 0,
        sessions: 0,
        orders: 0,
        revenue: 0,
        events: {}
      };
    }
    if (!store.daily[dateKey].events || typeof store.daily[dateKey].events !== "object") {
      store.daily[dateKey].events = {};
    }
    return store.daily[dateKey];
  }

  function ensureProductBucket(store, productName) {
    const key = String(productName || "").trim();
    if (!key) return null;

    if (!store.products[key]) {
      store.products[key] = {
        views: 0,
        opens: 0,
        cartAdds: 0,
        buyNowClicks: 0,
        orderedUnits: 0,
        revenue: 0,
        lastTouchedAt: null
      };
    }

    return store.products[key];
  }

  function getSessionState() {
    return safeParse(safeSessionGet(SESSION_KEY, "null"), null);
  }

  function saveSessionState(state) {
    if (!safeSessionSet(SESSION_KEY, JSON.stringify(state))) {
      console.warn("Ova session state could not be saved.");
    }
  }

  function sendRemoteEvent(payload) {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(REMOTE_ENDPOINT, blob);
        return;
      } catch (error) {
        // Fall back to fetch below.
      }
    }

    fetch(REMOTE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body,
      keepalive: true
    }).catch(() => {});
  }

  function getContextPayload(pageKey) {
    return {
      title: document.title || pageKey,
      path: window.location.pathname || "/",
      href: window.location.href || "",
      referrer: document.referrer || "",
      language: navigator.language || "",
      timezone: (() => {
        try {
          return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        } catch (error) {
          return "";
        }
      })(),
      viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
      screen: `${window.screen && window.screen.width ? window.screen.width : 0}x${window.screen && window.screen.height ? window.screen.height : 0}`
    };
  }

  function buildPayloadContext(pageKey, extraPayload) {
    const details = extraPayload && typeof extraPayload === "object" ? extraPayload : {};
    return {
      ...getContextPayload(pageKey),
      ...details
    };
  }

  function touchSession(store, pageKey) {
    const now = Date.now();
    const dateIso = new Date(now).toISOString();
    let session = getSessionState();
    const isExpired = !session || !session.lastActivityAt || now - session.lastActivityAt > SESSION_TIMEOUT_MS;
    const isNewSession = isExpired;

    if (isNewSession) {
      session = {
        id: `session-${now}-${Math.random().toString(36).slice(2, 8)}`,
        startedAt: now,
        lastActivityAt: now,
        lastPage: pageKey
      };
      store.totalSessions += 1;
      store.lastSessionAt = dateIso;
      ensureDailyBucket(store, todayKey(dateIso)).sessions += 1;
      ensurePageBucket(store, pageKey).sessions += 1;
    } else {
      session.lastActivityAt = now;
      session.lastPage = pageKey;
    }

    saveSessionState(session);
    return { session, isNewSession };
  }

  function incrementEventMetric(productBucket, eventName) {
    if (!productBucket) return;
    if (eventName === "product_view") productBucket.views += 1;
    if (eventName === "product_open") productBucket.opens += 1;
    if (eventName === "add_to_cart") productBucket.cartAdds += 1;
    if (eventName === "buy_now") productBucket.buyNowClicks += 1;
    productBucket.lastTouchedAt = nowIso();
  }

  function trackPageView(explicitPage) {
    const store = getStore();
    const pageKey = getPageKey(explicitPage);
    const timestamp = nowIso();

    if (!store.firstVisitAt) {
      store.firstVisitAt = timestamp;
    }

    store.lastVisitAt = timestamp;
    const { session } = touchSession(store, pageKey);

    const pageBucket = ensurePageBucket(store, pageKey);
    pageBucket.views += 1;
    pageBucket.lastViewedAt = timestamp;
    pageBucket.title = document.title || pageKey;

    store.totalPageViews += 1;
    ensureDailyBucket(store, todayKey(timestamp)).views += 1;

    saveStore(store);

    sendRemoteEvent({
      event_name: "page_view",
      page: pageKey,
      session_id: session && session.id,
      visitor_id: getVisitorId(),
      payload: buildPayloadContext(pageKey, {
        searchedProduct: new URLSearchParams(window.location.search).get("product") || ""
      })
    });

    return store;
  }

  function track(eventName, payload) {
    const name = String(eventName || "").trim();
    if (!name) return;

    const details = payload && typeof payload === "object" ? payload : {};
    const store = getStore();
    const pageKey = getPageKey(details.page);
    const timestamp = nowIso();

    if (!store.firstVisitAt) {
      store.firstVisitAt = timestamp;
    }

    store.lastVisitAt = timestamp;
    const { session } = touchSession(store, pageKey);
    store.events[name] = (store.events[name] || 0) + 1;
    ensureDailyBucket(store, todayKey(timestamp)).events[name] =
      (ensureDailyBucket(store, todayKey(timestamp)).events[name] || 0) + 1;

    const productBucket = ensureProductBucket(store, details.productName);
    incrementEventMetric(productBucket, name);

    saveStore(store);

    sendRemoteEvent({
      event_name: name,
      page: pageKey,
      product_name: details.productName || "",
      session_id: session && session.id,
      visitor_id: getVisitorId(),
      order_id: details.orderId || "",
      payload: buildPayloadContext(pageKey, details.payload)
    });

    return store;
  }

  function trackProductView(productName) {
    const cleanName = String(productName || "").trim();
    if (!cleanName) return;
    track("product_view", { productName: cleanName });
  }

  function trackOrder(order) {
    if (!order || !order.id) return;

    const store = getStore();
    if (store.trackedOrderIds.includes(order.id)) return;

    store.trackedOrderIds.unshift(order.id);
    if (store.trackedOrderIds.length > MAX_TRACKED_ORDERS) {
      store.trackedOrderIds = store.trackedOrderIds.slice(0, MAX_TRACKED_ORDERS);
    }

    const orderDate = order.createdAt || order.timestamp || nowIso();
    const dateKey = todayKey(orderDate);
    const totalPrice = Number(order.totalPrice || 0);
    const items = Array.isArray(order.items) ? order.items : [];
    const customerName = order.customerName || order.fullName || order.name || "";
    const address = order.address || order.addressLine || "";

    track("order_completed", {
      page: "payment.html",
      productName: "",
      orderId: order.id,
      payload: {
        orderId: order.id,
        totalPrice: Number(order.totalPrice || 0),
        customerName,
        fullName: customerName,
        name: customerName,
        email: order.email || "",
        phone: order.phone || "",
        address,
        addressLine: address,
        city: order.city || "",
        country: order.country || "",
        fullAddress: order.fullAddress || [address, order.city || "", order.country || ""].filter(Boolean).join(", "),
        paymentMethod: order.paymentMethod || "",
        items: Array.isArray(order.items) ? order.items : []
      }
    });

    const refreshedStore = getStore();
    refreshedStore.trackedOrderIds = store.trackedOrderIds;
    const dailyBucket = ensureDailyBucket(refreshedStore, dateKey);
    dailyBucket.orders += 1;
    dailyBucket.revenue += totalPrice;

    items.forEach((item) => {
      const bucket = ensureProductBucket(refreshedStore, item.name);
      if (!bucket) return;

      const quantity = Number(item.quantity || 0);
      const subtotal = Number(item.subtotal || quantity * Number(item.price || 0));
      bucket.orderedUnits += quantity;
      bucket.revenue += subtotal;
      bucket.lastTouchedAt = nowIso();
    });

    saveStore(refreshedStore);
  }

  function reset() {
    safeLocalRemove(STORAGE_KEY);
    safeSessionRemove(SESSION_KEY);
  }

  function guessProductName(value) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && typeof value.name === "string") return value.name;
    return "";
  }

  function patchFunction(functionName, wrapperFactory) {
    let attempts = 0;
    const maxAttempts = 80;
    const timer = setInterval(() => {
      attempts += 1;
      const original = window[functionName];

      if (typeof original === "function" && !original.__ovaAnalyticsPatched) {
        const wrapped = wrapperFactory(original);
        wrapped.__ovaAnalyticsPatched = true;
        window[functionName] = wrapped;
        clearInterval(timer);
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, 250);
  }

  function installAutoTracking() {
    trackPageView();

    const productNameFromUrl = new URLSearchParams(window.location.search).get("product");
    if (productNameFromUrl) {
      trackProductView(productNameFromUrl);
    }

    patchFunction("openModal", (original) => function patchedOpenModal() {
      const productName = guessProductName(arguments[0]);
      if (productName) track("product_open", { productName });
      return original.apply(this, arguments);
    });

    patchFunction("addToCart", (original) => function patchedAddToCart() {
      const productName = guessProductName(arguments[0]);
      if (productName) track("add_to_cart", { productName });
      return original.apply(this, arguments);
    });

    patchFunction("quickAdd", (original) => function patchedQuickAdd() {
      const productName = guessProductName(arguments[0]);
      if (productName) track("add_to_cart", { productName });
      return original.apply(this, arguments);
    });

    patchFunction("buyNow", (original) => function patchedBuyNow() {
      const productName = guessProductName(arguments[0]);
      if (productName) track("buy_now", { productName });
      return original.apply(this, arguments);
    });

    patchFunction("buyNowFromModal", (original) => function patchedBuyNowFromModal() {
      track("buy_now");
      return original.apply(this, arguments);
    });

    patchFunction("checkout", (original) => function patchedCheckout() {
      track("begin_checkout");
      return original.apply(this, arguments);
    });

    patchFunction("goToCheckout", (original) => function patchedGoToCheckout() {
      track("begin_checkout");
      return original.apply(this, arguments);
    });

    patchFunction("handleRegister", (original) => function patchedHandleRegister() {
      const result = original.apply(this, arguments);
      setTimeout(() => track("account_register"), 30);
      return result;
    });

    patchFunction("handleLogin", (original) => function patchedHandleLogin() {
      const result = original.apply(this, arguments);
      setTimeout(() => track("account_login"), 30);
      return result;
    });

    patchFunction("confirmPayment", (original) => async function patchedConfirmPayment() {
      const beforeIds = new Set(
        window.ovaOrdersStore && typeof window.ovaOrdersStore.getAll === "function"
          ? window.ovaOrdersStore.getAll().map((order) => order.id)
          : []
      );

      track("payment_attempt");

      const result = await original.apply(this, arguments);

      setTimeout(() => {
        if (!window.ovaOrdersStore || typeof window.ovaOrdersStore.getAll !== "function") return;
        const newOrder = window.ovaOrdersStore.getAll().find((order) => !beforeIds.has(order.id));
        if (newOrder) trackOrder(newOrder);
      }, 80);

      return result;
    });
  }

  function sendHeartbeat() {
    if (document.visibilityState === "hidden") return;
    track("heartbeat", {
      payload: {
        heartbeat: true
      }
    });
  }

  function startHeartbeat() {
    if (heartbeatIntervalId) return;
    heartbeatIntervalId = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
  }

  window.ovaAnalytics = {
    getStore,
    track,
    trackPageView,
    trackProductView,
    trackOrder,
    reset
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      installAutoTracking();
      startHeartbeat();
    }, { once: true });
  } else {
    installAutoTracking();
    startHeartbeat();
  }
})();
