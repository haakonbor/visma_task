const express = require("express");
const { v4: uuidv4 } = require("uuid");
const MenuItem = require("./MenuItem");

const app = express();

// Menu
const menuItems = [
  new MenuItem(
    uuidv4(),
    "Pizza Margherita",
    "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    8.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Pepperoni Pizza",
    "Pepperoni pizza with a spicy kick, topped with jalapeños.",
    10.99,
    true,
    true
  ),
  new MenuItem(
    uuidv4(),
    "Caesar Salad",
    "Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
    6.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Grilled Chicken Sandwich",
    "Grilled chicken breast with lettuce, tomato, and mayo on a toasted bun.",
    7.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Buffalo Wings",
    "Chicken wings tossed in a spicy buffalo sauce, served with blue cheese dressing.",
    9.99,
    true,
    true
  ),
  new MenuItem(
    uuidv4(),
    "Vegan Burger",
    "Plant-based burger patty with lettuce, tomato, and vegan mayo on a whole grain bun.",
    8.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Pasta Primavera",
    "Fresh vegetables sautéed with garlic and olive oil, served over pasta.",
    12.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Thai Noodles",
    "Rice noodles stir-fried with vegetables in a spicy Thai sauce.",
    11.99,
    true,
    true
  ),
  new MenuItem(
    uuidv4(),
    "Cheesecake",
    "Classic New York-style cheesecake with a graham cracker crust.",
    5.99,
    true,
    false
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Tofu Stir-Fry",
    "Tofu stir-fried with vegetables in a spicy sauce, served with rice.",
    10.99,
    true,
    true
  ),
];

// GET menu
app.get("/menu", (req, res) => {
  res.status(200).json(menuItems);
});

// POST order
app.post("/order", (req, res) => {
  res.status(200);
});

// GET order/id
app.get("/order/:id", (req, res) => {
  res.status(404).send("Order not found.");
});

// Port
app.listen(3000);
