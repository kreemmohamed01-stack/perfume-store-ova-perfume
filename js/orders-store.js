window.ovaOrdersStore = {
  key: "ovaOrders",
  normalizeOrder(orderData, fallbackId, fallbackCreatedAt) {
    const source = orderData && typeof orderData === "object" ? orderData : {};
    const customerName = String(source.customerName || source.fullName || source.name || "").trim();
    const addressLine = String(source.addressLine || source.address || "").trim();
    const city = String(source.city || "").trim();
    const country = String(source.country || "").trim();
    const items = Array.isArray(source.items)
      ? source.items.map((item) => {
          const quantity = Number(item && (item.quantity || item.qty) || 0);
          const price = Number(item && item.price || 0);
          return {
            ...(item && typeof item === "object" ? item : {}),
            quantity,
            price,
            subtotal: Number(item && item.subtotal || quantity * price)
          };
        })
      : [];

    return {
      ...source,
      id: String(source.id || fallbackId || "").trim(),
      createdAt: source.createdAt || fallbackCreatedAt || new Date().toISOString(),
      customerName,
      fullName: customerName || String(source.fullName || "").trim(),
      name: customerName || String(source.name || "").trim(),
      email: String(source.email || "").trim(),
      phone: String(source.phone || "").trim(),
      address: addressLine,
      addressLine,
      city,
      country,
      fullAddress: String(source.fullAddress || [addressLine, city, country].filter(Boolean).join(", ")).trim(),
      totalPrice: Number(source.totalPrice || 0),
      items
    };
  },
  getAll() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.key) || "[]");
      return Array.isArray(saved) ? saved.map((order) => this.normalizeOrder(order)) : [];
    } catch (error) {
      return [];
    }
  },
  saveAll(orders) {
    const normalized = Array.isArray(orders) ? orders.map((order) => this.normalizeOrder(order)) : [];
    localStorage.setItem(this.key, JSON.stringify(normalized));
  },
  create(orderData) {
    const orders = this.getAll();
    const nextNumber = orders.length + 1;
    const order = this.normalizeOrder(
      orderData,
      `ORD-${String(nextNumber).padStart(4, "0")}`,
      new Date().toISOString()
    );

    orders.unshift(order);
    this.saveAll(orders);
    return order;
  },
  update(orderId, patch) {
    if (!orderId) return null;
    const orders = this.getAll();
    const index = orders.findIndex((order) => order.id === orderId);
    if (index === -1) return null;

    orders[index] = this.normalizeOrder(
      {
        ...orders[index],
        ...patch
      },
      orders[index].id,
      orders[index].createdAt
    );

    this.saveAll(orders);
    return orders[index];
  },
  clear() {
    localStorage.removeItem(this.key);
  }
};
