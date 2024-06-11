const { v4: uuidv4 } = require("uuid");
const MenuItem = require("./MenuItem");

const menuItems = [
  new MenuItem(
    uuidv4(),
    "Pizza Margherita",
    "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    80,
    true,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Pepperoni Pizza",
    "Pepperoni pizza with a spicy kick, topped with jalapeños.",
    100,
    true,
    2
  ),
  new MenuItem(
    uuidv4(),
    "Caesar Salad",
    "Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
    60,
    false,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Grilled Chicken Sandwich",
    "Grilled chicken breast with lettuce, tomato, and mayo on a toasted bun.",
    70,
    true,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Buffalo Wings",
    "Chicken wings tossed in a spicy buffalo sauce, served with blue cheese dressing.",
    90,
    true,
    1
  ),
  new MenuItem(
    uuidv4(),
    "Vegan Burger",
    "Plant-based burger patty with lettuce, tomato, and vegan mayo on a whole grain bun.",
    80,
    true,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Pasta Primavera",
    "Fresh vegetables sautéed with garlic and olive oil, served over pasta.",
    120,
    true,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Thai Noodles",
    "Rice noodles stir-fried with vegetables in a spicy Thai sauce.",
    110,
    true,
    3
  ),
  new MenuItem(
    uuidv4(),
    "Cheesecake",
    "Classic New York-style cheesecake with a graham cracker crust.",
    50,
    true,
    0
  ),
  new MenuItem(
    uuidv4(),
    "Spicy Tofu Stir-Fry",
    "Tofu stir-fried with vegetables in a spicy sauce, served with rice.",
    100,
    true,
    2
  ),
];

module.exports = { menuItems };
