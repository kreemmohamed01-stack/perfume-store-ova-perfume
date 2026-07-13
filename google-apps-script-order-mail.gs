const STORE_NAME = "Ova Store";
const STORE_NOTIFICATION_EMAIL = "a.salem8812@gmail.com";
const STORE_NOTIFICATION_EMAILS = [STORE_NOTIFICATION_EMAIL];
const STORE_TIMEZONE = "Africa/Cairo";
const ORDERS_PASSWORD = "kreem2222";
const ORDERS_STORE_KEY = "ova_orders_archive";
const ORDERS_ERROR_KEY = "ova_orders_last_error";
const MAX_STORED_ORDERS = 200;

function doGet(e) {
  const password = safeText(e && e.parameter && e.parameter.password);
  if (password === ORDERS_PASSWORD) {
    return jsonResponse({
      ok: true,
      orders: loadStoredOrders(),
      lastError: loadLastError()
    });
  }

  return jsonResponse({
    ok: true,
    service: "ova-orders-mailer",
    storeEmail: STORE_NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    const payload = parseIncomingPayload(e);
    const order = normalizeOrderPayload(payload);
    const recipients = resolveStoreRecipients(order);
    const message = {
      to: recipients.primary,
      subject: getStoreSubject(order),
      body: buildStoreEmailText(order),
      htmlBody: buildStoreEmailHtml(order),
      name: STORE_NAME,
      noReply: false
    };

    if (recipients.cc.length) {
      message.cc = recipients.cc.join(",");
    }

    if (isValidEmail(order.email)) {
      message.replyTo = order.email;
    }

    MailApp.sendEmail(message);

    saveOrderRecord(order);
    clearLastError();

    return jsonResponse({
      ok: true,
      orderId: order.id,
      sentTo: recipients.all
    });
  } catch (error) {
    saveLastError(error, e);
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function parseIncomingPayload(e) {
  const body = (e && e.postData && e.postData.contents) || "";
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch (jsonError) {
    const parsed = {};
    body.split("&").forEach(function (part) {
      if (!part) return;
      const pair = part.split("=");
      const key = decodeURIComponent((pair[0] || "").replace(/\+/g, " "));
      const value = decodeURIComponent((pair.slice(1).join("=") || "").replace(/\+/g, " "));
      parsed[key] = value;
    });

    if (parsed.payload) {
      try {
        return JSON.parse(parsed.payload);
      } catch (payloadError) {
        throw new Error("Invalid payload JSON.");
      }
    }

    return parsed;
  }
}

function normalizeOrderPayload(payload) {
  const items = Array.isArray(payload.items) ? payload.items : [];

  return {
    id: safeText(payload.id, buildOrderId()),
    createdAt: safeText(payload.createdAt || payload.timestamp, formatDateTime(new Date())),
    fullName: safeText(payload.fullName, "Unknown customer"),
    email: safeText(payload.email || payload.customerEmail),
    phone: safeText(payload.phone),
    address: safeText(payload.address),
    notes: safeText(payload.notes, "No notes"),
    paymentMethod: safeText(payload.paymentMethod, "Not specified"),
    payerPhone: safeText(payload.payerPhone, "Not provided"),
    proofName: safeText(payload.proofName, "No attachment uploaded"),
    totalPrice: normalizeNumber(payload.totalPrice),
    quizDiscount: normalizeNumber(payload.quizDiscount),
    notificationEmail: safeText(payload.notificationEmail || payload.storeEmail),
    storeEmail: safeText(payload.storeEmail || payload.notificationEmail),
    rawSummary: safeText(payload.rawSummary),
    items: items.map(function (item) {
      return {
        name: safeText(item.name, "Unnamed product"),
        price: normalizeNumber(item.price),
        quantity: normalizeNumber(item.quantity || item.qty),
        freeUnits: normalizeNumber(item.freeUnits),
        subtotal: normalizeNumber(item.subtotal)
      };
    })
  };
}

function resolveStoreRecipients(order) {
  const collected = []
    .concat(STORE_NOTIFICATION_EMAILS)
    .concat([order.storeEmail, order.notificationEmail])
    .map(function (value) {
      return safeText(value).toLowerCase();
    })
    .filter(isValidEmail);

  const unique = [];
  collected.forEach(function (email) {
    if (unique.indexOf(email) === -1) unique.push(email);
  });

  if (!unique.length) {
    throw new Error("No valid store notification email is configured.");
  }

  return {
    primary: unique[0],
    cc: unique.slice(1),
    all: unique
  };
}

function getStoreSubject(order) {
  return "New Ova order - " + order.id;
}

function buildStoreEmailText(order) {
  const itemLines = order.items.map(function (item) {
    return "- " + item.name + " | Qty: " + item.quantity + " | Free: " + item.freeUnits + " | Subtotal: " + item.subtotal + " EGP";
  }).join("\n");

  return [
    "New order from Ova Store",
    "",
    "Order ID: " + order.id,
    "Date: " + order.createdAt,
    "Customer: " + order.fullName,
    "Email: " + (order.email || "Not provided"),
    "Phone: " + (order.phone || "Not provided"),
    "Address: " + (order.address || "Not provided"),
    "Payment method: " + order.paymentMethod,
    "Payer phone: " + order.payerPhone,
    "Proof file: " + order.proofName,
    "Quiz discount: " + order.quizDiscount + " EGP",
    "Total: " + order.totalPrice + " EGP",
    "Notes: " + (order.notes || "No notes"),
    "",
    "Items:",
    itemLines || "- No items"
  ].join("\n");
}

function buildStoreEmailHtml(order) {
  const itemRows = order.items.map(function (item) {
    return ""
      + "<tr>"
      + "<td style='padding:10px;border-bottom:1px solid #ececec'>" + escapeHtml(item.name) + "</td>"
      + "<td style='padding:10px;border-bottom:1px solid #ececec;text-align:center'>" + escapeHtml(String(item.quantity)) + "</td>"
      + "<td style='padding:10px;border-bottom:1px solid #ececec;text-align:center'>" + escapeHtml(String(item.freeUnits)) + "</td>"
      + "<td style='padding:10px;border-bottom:1px solid #ececec;text-align:right'>" + escapeHtml(String(item.subtotal)) + " EGP</td>"
      + "</tr>";
  }).join("");

  return ""
    + "<div style='font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.8'>"
    + "<h2 style='margin:0 0 16px'>New order from Ova Store</h2>"
    + "<table style='width:100%;border-collapse:collapse;background:#fffaf6;border:1px solid #efe6de;border-radius:12px;overflow:hidden'>"
    + "<tbody>"
    + infoRow("Order ID", order.id)
    + infoRow("Date", order.createdAt)
    + infoRow("Customer", order.fullName)
    + infoRow("Email", order.email || "Not provided")
    + infoRow("Phone", order.phone || "Not provided")
    + infoRow("Address", order.address || "Not provided")
    + infoRow("Payment method", order.paymentMethod)
    + infoRow("Payer phone", order.payerPhone)
    + infoRow("Proof file", order.proofName)
    + infoRow("Quiz discount", order.quizDiscount + " EGP")
    + infoRow("Total", order.totalPrice + " EGP")
    + infoRow("Notes", order.notes || "No notes")
    + "</tbody>"
    + "</table>"
    + "<h3 style='margin:24px 0 12px'>Order details</h3>"
    + "<table style='width:100%;border-collapse:collapse;background:#fff;border:1px solid #ececec;border-radius:12px;overflow:hidden'>"
    + "<thead>"
    + "<tr style='background:#faf6f1'>"
    + "<th style='padding:12px;text-align:left;border-bottom:1px solid #ececec'>Product</th>"
    + "<th style='padding:12px;text-align:center;border-bottom:1px solid #ececec'>Qty</th>"
    + "<th style='padding:12px;text-align:center;border-bottom:1px solid #ececec'>Free</th>"
    + "<th style='padding:12px;text-align:right;border-bottom:1px solid #ececec'>Subtotal</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody>" + (itemRows || "<tr><td colspan='4' style='padding:12px'>No items</td></tr>") + "</tbody>"
    + "</table>"
    + "</div>";
}

function infoRow(label, value) {
  return ""
    + "<tr>"
    + "<td style='padding:8px 10px;font-weight:700;vertical-align:top;width:180px'>" + escapeHtml(label) + "</td>"
    + "<td style='padding:8px 10px'>" + escapeHtml(String(value == null ? "" : value)) + "</td>"
    + "</tr>";
}

function loadStoredOrders() {
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(ORDERS_STORE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveOrderRecord(order) {
  const orders = loadStoredOrders();
  orders.unshift(order);
  PropertiesService.getScriptProperties().setProperty(
    ORDERS_STORE_KEY,
    JSON.stringify(orders.slice(0, MAX_STORED_ORDERS))
  );
}

function saveLastError(error, e) {
  try {
    PropertiesService.getScriptProperties().setProperty(
      ORDERS_ERROR_KEY,
      JSON.stringify({
        message: String(error && error.message ? error.message : error),
        timestamp: new Date().toISOString(),
        body: safeText(e && e.postData && e.postData.contents)
      })
    );
  } catch (storageError) {}
}

function loadLastError() {
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(ORDERS_ERROR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function clearLastError() {
  try {
    PropertiesService.getScriptProperties().deleteProperty(ORDERS_ERROR_KEY);
  } catch (error) {}
}

function buildOrderId() {
  return "ORD-" + Utilities.formatDate(new Date(), STORE_TIMEZONE, "yyyyMMdd-HHmmss");
}

function formatDateTime(date) {
  return Utilities.formatDate(date, STORE_TIMEZONE, "yyyy-MM-dd HH:mm:ss");
}

function normalizeNumber(value) {
  if (value === "" || value == null) return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function safeText(value, fallback) {
  const text = String(value == null ? "" : value).trim();
  return text || (fallback || "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
