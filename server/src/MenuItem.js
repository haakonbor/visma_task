class MenuItem {
  constructor(id, name, description, price, available, spicyness) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.available = available;
    this.spicyness = spicyness;
  }
}

module.exports = MenuItem;
