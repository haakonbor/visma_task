class OrderItem {
  constructor(id, items, total, status) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.status = status;
  }
}

module.exports(OrderItem);
