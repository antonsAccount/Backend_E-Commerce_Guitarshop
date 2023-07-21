const express = require("express");
const router = express.Router();
const { createCart } = require("../controllers/cart");

router.post("/", createCart);
module.exports = router;
