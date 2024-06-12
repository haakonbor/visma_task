const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { menuItems } = require("../data.js");
const Order = require("../Order.js");

let orders = [];

/* POST */
router.post("/", (req, res) => {
  const { items, total, status } = req.body;
  const id = uuidv4();

  if (items.length === 0) {
    return res.status(400).send("Invalid order: No valid items found");
  }

  const order = new Order(id, items, total, status);
  orders.push(order);
  res.status(201).json(order);
});

/* GET */
router.get("/:id", (req, res) => {
  const order = orders.find((order) => order.id === req.params.id);
  console.log("ORDERS: ");
  console.log(orders);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send("Order not found.");
  }
});

module.exports = router;
