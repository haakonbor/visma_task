const express = require("express");
const router = express.Router();
const { menuItems } = require("../data.js");

router.get("/", (req, res) => {
  res.json(menuItems);
});

module.exports = router;
