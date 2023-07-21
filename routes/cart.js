const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/requireAuth");
const { createCart } = require("../controllers/cart");
router.use(requireAuth);
router.post("/", createCart);
module.exports = router;
