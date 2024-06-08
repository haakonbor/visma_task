const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const menuRouter = require("./routes/menu");
const orderRouter = require("./routes/orders");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});

app.use("/menu", menuRouter);
app.use("/order", orderRouter);

app.listen(3000);
