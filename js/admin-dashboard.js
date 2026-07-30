(function adminDashboard() {
  const LIVE_REFRESH_MS = 15000;

  const state = {
    products: [],
    filteredProducts: [],
    analytics: null,
    orders: null,
    session: null,
    analyticsGeneratedAt: "",
    analyticsError: "",
    loading: false,
    autoRefreshTimer: null
  };

  const loginScreen = document.getElementById("loginScreen");
  const appScreen = document.getElementById("appScreen");
  const loginForm = document.getElementById("loginForm");
  const loginFeedback = document.getElementById("loginFeedback");
  const sessionLabel = document.getElementById("sessionLabel");
  const pageEyebrow = document.getElementById("pageEyebrow");
  const pageTitle = document.getElementById("pageTitle");
  const pageDescription = document.getElementById("pageDescription");
  const refreshButton = document.getElementById("refreshButton");
  const seedCatalogButton = document.getElementById("seedCatalogButton");
  const resetLiveDataButton = document.getElementById("resetLiveDataButton");
  const logoutButton = document.getElementById("logoutButton");
  const productSearch = document.getElementById("productSearch");
  const productsTableBody = document.getElementById("productsTableBody");
  const productsEmptyState = document.getElementById("productsEmptyState");
  const newProductButton = document.getElementById("newProductButton");
  const productForm = document.getElementById("productForm");
  const editorFeedback = document.getElementById("editorFeedback");
  const editorTitle = document.getElementById("editorTitle");
  const deleteProductButton = document.getElementById("deleteProductButton");
  const resetFormButton = document.getElementById("resetFormButton");

  const metricProducts = document.getElementById("metricProducts");
  const metricActiveVisitors = document.getElementById("metricActiveVisitors");
  const metricTodayVisitors = document.getElementById("metricTodayVisitors");
  const metricTodaySessions = document.getElementById("metricTodaySessions");
  const metricTodayPageViews = document.getElementById("metricTodayPageViews");
  const metricTodayOrders = document.getElementById("metricTodayOrders");
  const metricTodayRevenue = document.getElementById("metricTodayRevenue");
  const metricTotalRevenue = document.getElementById("metricTotalRevenue");

  const recentSessionsList = document.getElementById("recentSessionsList");
  const recentSessionsEmpty = document.getElementById("recentSessionsEmpty");
  const recentEventsList = document.getElementById("recentEventsList");
  const recentEventsEmpty = document.getElementById("recentEventsEmpty");
  const liveRefreshNote = document.getElementById("liveRefreshNote");
  const todaySummaryGrid = document.getElementById("todaySummaryGrid");
  const topPagesList = document.getElementById("topPagesList");
  const topPagesEmpty = document.getElementById("topPagesEmpty");
  const topProductsList = document.getElementById("topProductsList");
  const topProductsEmpty = document.getElementById("topProductsEmpty");
  const recentOrdersList = document.getElementById("recentOrdersList");
  const recentOrdersEmpty = document.getElementById("recentOrdersEmpty");
  const ordersSummaryGrid = document.getElementById("ordersSummaryGrid");
  const sidebarLiveVisitors = document.getElementById("sidebarLiveVisitors");
  const sidebarStatusText = document.getElementById("sidebarStatusText");
  const navButtons = Array.from(document.querySelectorAll("[data-page-target]"));
  const contentPages = Array.from(document.querySelectorAll("[data-page]"));

  const fields = {
    id: document.getElementById("productId"),
    name: document.getElementById("productName"),
    slug: document.getElementById("productSlug"),
    brand_key: document.getElementById("productBrandKey"),
    brand_title: document.getElementById("productBrandTitle"),
    price: document.getElementById("productPrice"),
    image_url: document.getElementById("productImageUrl"),
    image_alt_url: document.getElementById("productImageAltUrl"),
    category: document.getElementById("productCategory"),
    status: document.getElementById("productStatus"),
    size_label: document.getElementById("productSizeLabel"),
    badge: document.getElementById("productBadge"),
    sort_order: document.getElementById("productSortOrder"),
    source_page: document.getElementById("productSourcePage"),
    description: document.getElementById("productDescription"),
    details_html: document.getElementById("productDetailsHtml"),
    is_featured: document.getElementById("productFeatured"),
    is_best_seller: document.getElementById("productBestSeller")
  };

  const PAGE_META = {
    overview: {
      eyebrow: "Overview",
      title: "Store pulse and catalog control",
      description: "Track today's visitors, strongest pages, and perfume performance from one clean summary page."
    },
    live: {
      eyebrow: "Live",
      title: "Live visitors and activity",
      description: "See whether anyone is on the site right now and watch the latest events in real time."
    },
    orders: {
      eyebrow: "Orders",
      title: "Orders feed and revenue tracking",
      description: "Every new order appears here with its details, plus a clear summary of sales and revenue."
    },
    products: {
      eyebrow: "Products",
      title: "Catalog manager",
      description: "Add, edit, and hide perfumes from one page, with changes reflected on the storefront."
    }
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setFeedback(node, message, type) {
    if (!node) return;
    node.textContent = message || "";
    node.className = "feedback" + (type ? ` ${type}` : "");
  }

  function currency(value) {
    const amount = Number(value || 0);
    if (!Number.isFinite(amount)) return "EGP 0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function formatRelativeTime(value) {
    const timestamp = new Date(value || "").getTime();
    if (!Number.isFinite(timestamp) || !timestamp) return "unknown";

    const diffSeconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
    if (diffSeconds < 10) return "just now";
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  }

  function escapeAndFallback(value, fallback = "Unknown") {
    const text = String(value || "").trim();
    return escapeHtml(text || fallback);
  }

  async function request(url, options) {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }
    return data;
  }

  function setSignedInState(isSignedIn) {
    loginScreen.classList.toggle("hidden", isSignedIn);
    appScreen.classList.toggle("hidden", !isSignedIn);
  }

  function resetProductForm() {
    productForm.reset();
    fields.id.value = "";
    fields.category.value = "unisex";
    fields.status.value = "active";
    fields.sort_order.value = "0";
    fields.is_featured.checked = false;
    fields.is_best_seller.checked = false;
    editorTitle.textContent = "Create product";
    deleteProductButton.classList.add("hidden");
    setFeedback(editorFeedback, "", "");
  }

  function collectFormPayload() {
    return {
      id: fields.id.value.trim(),
      name: fields.name.value.trim(),
      slug: fields.slug.value.trim(),
      brand_key: fields.brand_key.value.trim(),
      brand_title: fields.brand_title.value.trim(),
      price: fields.price.value.trim(),
      image_url: fields.image_url.value.trim(),
      image_alt_url: fields.image_alt_url.value.trim(),
      category: fields.category.value,
      status: fields.status.value,
      size_label: fields.size_label.value.trim(),
      badge: fields.badge.value.trim(),
      sort_order: fields.sort_order.value.trim() || 0,
      source_page: fields.source_page.value.trim(),
      description: fields.description.value.trim(),
      details_html: fields.details_html.value.trim(),
      is_featured: fields.is_featured.checked,
      is_best_seller: fields.is_best_seller.checked,
      metadata: {}
    };
  }

  function fillProductForm(product) {
    fields.id.value = product.id || "";
    fields.name.value = product.name || "";
    fields.slug.value = product.slug || "";
    fields.brand_key.value = product.brand_key || "";
    fields.brand_title.value = product.brand_title || "";
    fields.price.value = product.price || 0;
    fields.image_url.value = product.image_url || "";
    fields.image_alt_url.value = product.image_alt_url || "";
    fields.category.value = product.category || "unisex";
    fields.status.value = product.status || "active";
    fields.size_label.value = product.size_label || "";
    fields.badge.value = product.badge || "";
    fields.sort_order.value = product.sort_order || 0;
    fields.source_page.value = product.source_page || "";
    fields.description.value = product.description || "";
    fields.details_html.value = product.details_html || "";
    fields.is_featured.checked = !!product.is_featured;
    fields.is_best_seller.checked = !!product.is_best_seller;
    editorTitle.textContent = `Edit ${product.name || "product"}`;
    deleteProductButton.classList.remove("hidden");
    setFeedback(editorFeedback, "", "");
  }

  function renderMetrics() {
    const analytics = state.analytics || {};
    const orders = state.orders || {};
    const live = analytics.live || {};
    const today = analytics.today || {};

    metricProducts.textContent = String(state.products.length);
    metricActiveVisitors.textContent = String(live.activeVisitorsNow || 0);
    metricTodayVisitors.textContent = String(today.visitors || 0);
    metricTodaySessions.textContent = String(today.sessions || 0);
    metricTodayPageViews.textContent = String(today.pageViews || 0);
    metricTodayOrders.textContent = String(today.orders || 0);
    metricTodayRevenue.textContent = currency(today.revenue || 0);
    metricTotalRevenue.textContent = currency(orders.revenue || 0);

    if (liveRefreshNote) {
      const timezone = analytics.timezone || "Africa/Cairo";
      liveRefreshNote.textContent = state.analyticsError
        ? `Live tracking issue: ${state.analyticsError}`
        : `Auto refresh every 15 seconds. Timezone: ${timezone}. Active sessions now: ${live.activeSessionsNow || 0}. Last update: ${formatRelativeTime(state.analyticsGeneratedAt || new Date().toISOString())}.`;
    }

    if (sidebarLiveVisitors) {
      const activeVisitors = Number(live.activeVisitorsNow || 0);
      sidebarLiveVisitors.textContent = state.analyticsError
        ? "Tracking offline"
        : `${activeVisitors} ${activeVisitors === 1 ? "live visitor" : "live visitors"}`;
    }

    if (sidebarStatusText) {
      const activeVisitors = Number(live.activeVisitorsNow || 0);
      const todayOrders = Number(today.orders || 0);
      sidebarStatusText.textContent = state.analyticsError
        ? `Analytics is not loading: ${state.analyticsError}`
        : activeVisitors > 0
        ? `${activeVisitors} ${activeVisitors === 1 ? "visitor is" : "visitors are"} active on the site right now. Today's orders so far: ${todayOrders}.`
        : `No active visitors right now. Today's orders so far: ${todayOrders}.`;
    }
  }

  function renderTodaySummary() {
    const analytics = state.analytics || {};
    const orders = state.orders || {};
    const today = analytics.today || {};
    const cards = [
      { label: "Today visitors", value: String(today.visitors || 0), note: "Unique visitors since 12:00 AM Cairo time." },
      { label: "Today events", value: String(today.events || 0), note: "All tracked actions fired today." },
      { label: "Today units sold", value: String(today.unitsSold || 0), note: "Perfume units sold through completed orders today." },
      { label: "Average order", value: currency(orders.averageOrder || 0), note: "Average value of completed tracked orders." }
    ];

    if (!todaySummaryGrid) return;
    todaySummaryGrid.innerHTML = cards.map((card) => `
      <div class="summary-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${escapeHtml(card.note)}</small>
      </div>
    `).join("");
  }

  function renderOrdersSummary() {
    if (!ordersSummaryGrid) return;

    const analytics = state.analytics || {};
    const orders = state.orders || {};
    const today = analytics.today || {};
    const cards = [
      { label: "Today orders", value: String(today.orders || 0), note: "Completed orders tracked since 12:00 AM Cairo time." },
      { label: "Today revenue", value: currency(today.revenue || 0), note: "Revenue from completed orders today." },
      { label: "Units sold today", value: String(today.unitsSold || 0), note: "Total perfume units sold through tracked orders." },
      { label: "Average order", value: currency(orders.averageOrder || 0), note: "Average value across all completed tracked orders." }
    ];

    ordersSummaryGrid.innerHTML = cards.map((card) => `
      <div class="summary-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${escapeHtml(card.note)}</small>
      </div>
    `).join("");
  }

  function renderLiveActivity() {
    const analytics = state.analytics || {};
    const live = analytics.live || {};
    const sessions = Array.isArray(live.recentSessions) ? live.recentSessions : [];
    const events = Array.isArray(live.recentEvents) ? live.recentEvents : [];
    const activeWindowMinutes = Number(live.activeWindowMinutes || 5);
    const activeWindowMs = activeWindowMinutes * 60 * 1000;

    if (recentSessionsList) {
      recentSessionsList.innerHTML = sessions.slice(0, 8).map((session) => {
        const lastSeenAt = new Date(session.lastSeenAt || "").getTime();
        const isActive = Number.isFinite(lastSeenAt) && lastSeenAt >= Date.now() - activeWindowMs;
        const title = session.lastTitle || session.lastPage || session.lastPath || "Unknown page";
        const path = session.lastPath || session.lastPage || "/";
        return `
          <div class="live-item">
            <div class="live-item-top">
              <strong>${escapeAndFallback(title)}</strong>
              <span class="status-chip${isActive ? "" : " idle"}">${isActive ? "Live now" : "Recent"}</span>
            </div>
            <span>${escapeAndFallback(path, "/")}</span>
            <small>Visitor: ${escapeAndFallback(session.visitorId || session.sessionId, "unknown")} | Events: ${escapeHtml(String(session.eventCount || 0))} | Last seen: ${escapeHtml(formatRelativeTime(session.lastSeenAt))}</small>
          </div>
        `;
      }).join("");
    }

    if (recentEventsList) {
      recentEventsList.innerHTML = events.slice(0, 10).map((item) => {
        const title = item.productName || item.title || item.page || item.eventName || "Event";
        const extra = item.path || item.page || item.referrer || "";
        return `
          <div class="live-item">
            <div class="live-item-top">
              <strong>${escapeAndFallback(title)}</strong>
              <span class="status-chip idle">${escapeAndFallback(item.eventName || "event", "event")}</span>
            </div>
            <span>${escapeAndFallback(extra, "No path")}</span>
            <small>${escapeAndFallback(item.visitorId || item.sessionId, "unknown visitor")} | ${escapeHtml(formatRelativeTime(item.createdAt))}</small>
          </div>
        `;
      }).join("");
    }

    if (recentSessionsEmpty) recentSessionsEmpty.classList.toggle("hidden", sessions.length > 0);
    if (recentEventsEmpty) recentEventsEmpty.classList.toggle("hidden", events.length > 0);
  }

  function renderTopPages() {
    const pages = Array.isArray(state.analytics?.pages) ? state.analytics.pages : [];
    if (!topPagesList) return;
    topPagesList.innerHTML = pages.slice(0, 8).map((page) => `
      <div class="stacked-item">
        <div>
          <strong>${escapeAndFallback(page.title || page.page, "Unknown page")}</strong>
          <span>${escapeAndFallback(page.page, "/")} | ${escapeHtml(formatRelativeTime(page.lastViewedAt))}</span>
        </div>
        <em>${escapeHtml(String(page.views || 0))} views</em>
      </div>
    `).join("");
    if (topPagesEmpty) topPagesEmpty.classList.toggle("hidden", pages.length > 0);
  }

  function renderTopProducts() {
    const products = Array.isArray(state.analytics?.products) ? state.analytics.products : [];
    if (!topProductsList) return;
    topProductsList.innerHTML = products.slice(0, 8).map((product) => `
      <div class="stacked-item">
        <div>
          <strong>${escapeAndFallback(product.name, "Unknown product")}</strong>
          <span>Views: ${escapeHtml(String(product.views || 0))} | Cart: ${escapeHtml(String(product.cartAdds || 0))} | Buy now: ${escapeHtml(String(product.buyNowClicks || 0))}</span>
        </div>
        <em>${escapeHtml(String(product.orderedUnits || 0))} sold</em>
      </div>
    `).join("");
    if (topProductsEmpty) topProductsEmpty.classList.toggle("hidden", products.length > 0);
  }

  function renderRecentOrders() {
    const orders = Array.isArray(state.orders?.recentOrders) ? state.orders.recentOrders : [];
    if (!recentOrdersList) return;
    recentOrdersList.innerHTML = orders.map((order) => {
      const items = Array.isArray(order.items) ? order.items : [];
      const address = order.fullAddress || [order.address, order.city, order.country].filter(Boolean).join(" | ");
      return `
        <article class="order-card">
          <div class="order-head">
            <div>
              <strong>${escapeAndFallback(order.orderId, "Order")}</strong>
              <span>${escapeHtml(formatRelativeTime(order.createdAt))}</span>
            </div>
            <div class="order-meta">
              <span class="meta-pill">${escapeAndFallback(order.paymentMethod || "payment", "payment")}</span>
              <span class="meta-pill">${escapeHtml(currency(order.totalPrice || 0))}</span>
            </div>
          </div>
          <div class="order-grid">
            <div class="order-cell">
              <span>Customer</span>
              <strong>${escapeAndFallback(order.customerName, "Not provided")}</strong>
            </div>
            <div class="order-cell">
              <span>Phone</span>
              <strong>${escapeAndFallback(order.phone, "Not provided")}</strong>
            </div>
            <div class="order-cell">
              <span>Email</span>
              <strong>${escapeAndFallback(order.email, "Not provided")}</strong>
            </div>
            <div class="order-cell">
              <span>Address</span>
              <strong>${escapeAndFallback(address, "Not provided")}</strong>
            </div>
          </div>
          <div class="order-items">
            ${items.length ? items.map((item) => `
              <div class="order-item-row">
                <span>${escapeAndFallback(item.name, "Item")}</span>
                <span>Qty ${escapeHtml(String(item.quantity || 0))} | ${escapeHtml(currency(item.subtotal || 0))}</span>
              </div>
            `).join("") : `<div class="order-item-row"><span>No item details attached</span><span>-</span></div>`}
          </div>
        </article>
      `;
    }).join("");
    if (recentOrdersEmpty) recentOrdersEmpty.classList.toggle("hidden", orders.length > 0);
  }

  function setActivePage(pageKey) {
    const nextPage = PAGE_META[pageKey] ? pageKey : "overview";
    const meta = PAGE_META[nextPage];

    navButtons.forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-page-target") === nextPage);
    });

    contentPages.forEach((section) => {
      section.classList.toggle("hidden", section.getAttribute("data-page") !== nextPage);
    });

    if (pageEyebrow) pageEyebrow.textContent = meta.eyebrow;
    if (pageTitle) pageTitle.textContent = meta.title;
    if (pageDescription) pageDescription.textContent = meta.description;

    if (window.location.hash !== `#${nextPage}`) {
      window.location.hash = nextPage;
    }
  }

  function resolveInitialPage() {
    const hashPage = window.location.hash.replace(/^#/, "").trim().toLowerCase();
    return PAGE_META[hashPage] ? hashPage : "overview";
  }

  function buildFlags(product) {
    const flags = [];
    if (product.is_best_seller) flags.push("Best seller");
    if (product.is_featured) flags.push("Featured");
    if (product.badge) flags.push(product.badge);
    return flags.length ? flags.join(" / ") : "None";
  }

  function renderProducts() {
    const products = state.filteredProducts;
    productsTableBody.innerHTML = products.map((product) => {
      const statusClass = ["draft", "hidden"].includes(product.status) ? `status-${product.status}` : "";
      return `
        <tr data-product-id="${escapeHtml(product.id)}">
          <td>
            <div class="product-name">
              <strong>${escapeHtml(product.name)}</strong>
              <span>${escapeHtml(product.slug || "")}</span>
            </div>
          </td>
          <td>${escapeHtml(product.brand_title || product.brand_key || "Unassigned")}</td>
          <td>${escapeHtml(currency(product.price))}</td>
          <td><span class="pill ${escapeHtml(statusClass)}">${escapeHtml(product.status || "active")}</span></td>
          <td>${escapeHtml(buildFlags(product))}</td>
          <td><button class="btn btn-secondary" type="button" data-edit-product="${escapeHtml(product.id)}">Edit</button></td>
        </tr>
      `;
    }).join("");

    const hasProducts = products.length > 0;
    productsEmptyState.classList.toggle("hidden", hasProducts);
  }

  function applySearch() {
    const term = String(productSearch.value || "").trim().toLowerCase();
    if (!term) {
      state.filteredProducts = [...state.products];
      renderProducts();
      return;
    }

    state.filteredProducts = state.products.filter((product) => {
      const haystack = [
        product.name,
        product.slug,
        product.brand_key,
        product.brand_title,
        product.category,
        product.badge
      ].join(" ").toLowerCase();
      return haystack.includes(term);
    });
    renderProducts();
  }

  async function loadAnalytics() {
    try {
      const data = await request("/.netlify/functions/dashboard-stats", { method: "GET" });
      state.analytics = data.analytics || null;
      state.orders = data.orders || null;
      state.analyticsGeneratedAt = data.generatedAt || new Date().toISOString();
      state.analyticsError = "";
    } catch (error) {
      state.analytics = null;
      state.orders = null;
      state.analyticsGeneratedAt = null;
      state.analyticsError = error.message || "Unknown analytics error";
    }
  }

  async function loadProducts() {
    const data = await request("/.netlify/functions/admin-products", { method: "GET" });
    state.products = Array.isArray(data.products) ? data.products : [];
    state.filteredProducts = [...state.products];
  }

  async function refreshDashboard() {
    if (state.loading) return;
    state.loading = true;
    setFeedback(editorFeedback, "", "");

    try {
      await Promise.all([loadAnalytics(), loadProducts()]);
      renderMetrics();
      renderTodaySummary();
      renderOrdersSummary();
      renderLiveActivity();
      renderTopPages();
      renderTopProducts();
      renderRecentOrders();
      applySearch();
    } catch (error) {
      setFeedback(editorFeedback, error.message, "error");
    } finally {
      state.loading = false;
    }
  }

  async function verifySession() {
    try {
      const data = await request("/.netlify/functions/admin-session", { method: "GET" });
      state.session = data.user || null;
      sessionLabel.textContent = `Signed in as ${state.session?.email || "admin"}`;
      setSignedInState(true);
      startAutoRefresh();
      await refreshDashboard();
    } catch (error) {
      state.session = null;
      stopAutoRefresh();
      setSignedInState(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setFeedback(loginFeedback, "Signing in...", "");

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    try {
      const data = await request("/.netlify/functions/admin-login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      state.session = data.user || null;
      sessionLabel.textContent = `Signed in as ${state.session?.email || email}`;
      setSignedInState(true);
      startAutoRefresh();
      setFeedback(loginFeedback, "", "");
      loginForm.reset();
      await refreshDashboard();
    } catch (error) {
      setFeedback(loginFeedback, error.message, "error");
    }
  }

  async function handleLogout() {
    await request("/.netlify/functions/admin-logout", { method: "POST" });
    state.session = null;
    stopAutoRefresh();
    setSignedInState(false);
    resetProductForm();
  }

  function stopAutoRefresh() {
    if (state.autoRefreshTimer) {
      window.clearInterval(state.autoRefreshTimer);
      state.autoRefreshTimer = null;
    }
  }

  function startAutoRefresh() {
    stopAutoRefresh();
    state.autoRefreshTimer = window.setInterval(() => {
      if (document.hidden || !state.session) return;
      refreshDashboard();
    }, LIVE_REFRESH_MS);
  }

  async function syncCurrentCatalog() {
    const confirmed = window.confirm("Import the current site catalog into Supabase now?");
    if (!confirmed) return;

    setFeedback(editorFeedback, "Syncing current site catalog...", "");

    try {
      const data = await request("/.netlify/functions/admin-seed-catalog", {
        method: "POST",
        body: JSON.stringify({})
      });
      setFeedback(
        editorFeedback,
        `Imported ${data.imported || 0} products, ${data.bestSellers || 0} best sellers, across ${data.brands || 0} brands.`,
        "success"
      );
      await refreshDashboard();
    } catch (error) {
      setFeedback(editorFeedback, error.message, "error");
    }
  }

  async function resetLiveData() {
    const confirmed = window.confirm("Reset all live visitors, events, and tracked orders from analytics now?");
    if (!confirmed) return;

    const originalText = resetLiveDataButton ? resetLiveDataButton.textContent : "";
    if (resetLiveDataButton) {
      resetLiveDataButton.disabled = true;
      resetLiveDataButton.textContent = "Resetting...";
    }

    setFeedback(editorFeedback, "Resetting live analytics data...", "");

    try {
      await request("/.netlify/functions/dashboard-reset", {
        method: "POST",
        body: JSON.stringify({})
      });

      ["ovaAnalytics", "ovaAnalyticsSession", "ovaOrders", "ovaUsers", "ovaCart"].forEach((key) => {
        try {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        } catch (error) {
          // Ignore browser storage cleanup failures.
        }
      });

      setFeedback(editorFeedback, "Live analytics data was reset successfully.", "success");
      await refreshDashboard();
    } catch (error) {
      setFeedback(editorFeedback, error.message, "error");
    } finally {
      if (resetLiveDataButton) {
        resetLiveDataButton.disabled = false;
        resetLiveDataButton.textContent = originalText || "Reset live data";
      }
    }
  }

  async function saveProduct(event) {
    event.preventDefault();
    const payload = collectFormPayload();
    if (!payload.name) {
      setFeedback(editorFeedback, "Product name is required.", "error");
      return;
    }

    setFeedback(editorFeedback, "Saving product...", "");

    try {
      const data = await request("/.netlify/functions/admin-products", {
        method: payload.id ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });

      setFeedback(
        editorFeedback,
        payload.id ? `Updated ${data.product?.name || payload.name}.` : `Created ${data.product?.name || payload.name}.`,
        "success"
      );
      resetProductForm();
      await refreshDashboard();
    } catch (error) {
      setFeedback(editorFeedback, error.message, "error");
    }
  }

  async function removeProduct() {
    const id = fields.id.value.trim();
    const name = fields.name.value.trim();
    if (!id) return;

    const confirmed = window.confirm(`Delete ${name || "this product"} from the external catalog?`);
    if (!confirmed) return;

    setFeedback(editorFeedback, "Deleting product...", "");

    try {
      await request("/.netlify/functions/admin-products", {
        method: "DELETE",
        body: JSON.stringify({ id })
      });
      setFeedback(editorFeedback, `${name || "Product"} deleted.`, "success");
      resetProductForm();
      await refreshDashboard();
    } catch (error) {
      setFeedback(editorFeedback, error.message, "error");
    }
  }

  productsTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-product]");
    if (!button) return;
    const productId = button.getAttribute("data-edit-product");
    const product = state.products.find((item) => item.id === productId);
    if (!product) return;
    fillProductForm(product);
    setActivePage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  loginForm.addEventListener("submit", handleLogin);
  productForm.addEventListener("submit", saveProduct);
  productSearch.addEventListener("input", applySearch);
  refreshButton.addEventListener("click", refreshDashboard);
  seedCatalogButton.addEventListener("click", syncCurrentCatalog);
  resetLiveDataButton.addEventListener("click", resetLiveData);
  logoutButton.addEventListener("click", handleLogout);
  newProductButton.addEventListener("click", () => {
    setActivePage("products");
    resetProductForm();
  });
  deleteProductButton.addEventListener("click", removeProduct);
  resetFormButton.addEventListener("click", resetProductForm);
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActivePage(button.getAttribute("data-page-target"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  window.addEventListener("hashchange", () => {
    setActivePage(resolveInitialPage());
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.session) {
      refreshDashboard();
    }
  });

  resetProductForm();
  setActivePage(resolveInitialPage());
  verifySession();
})();
