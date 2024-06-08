const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { menuItems } = require("../data.js");
const Order = require("../Order.js");

const orders = [];

/* POST */
router.post("/", (req, res) => {
  const { items } = req.body;
  const id = uuidv4();

  if (items.length === 0) {
    return res.status(400).send("Invalid order: No valid items found");
  }

  // Get total cost and check if order only has spicy items
  let orderIsSpicy = true;
  const totalCost = items.reduce((sum, itemId) => {
    const item = menuItems.find((menuItem) => menuItem === itemId);

    if (item) {
      if (item.spicyness != 0) {
        orderIsSpicy = false;
      }
      return sum + item.price;
    }

    return 0;
  }, 0);

  const order = new Order(
    id,
    items,
    orderIsSpicy ? 0.9 * totalCost : totalCost,
    "pending"
  );
  orders.push(order);

  res.status(201).json(order);
});

/* GET, PUT, DELETE */
router
  .route("/:id")
  .get((req, res) => {
    const order = orders.find((order) => order.id === req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send("Order not found.");
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
