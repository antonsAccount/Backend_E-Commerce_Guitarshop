const express = require("express");
const router = express.Router();
const upload = require("../services/upload");

const { addInstrument } = require("../controllers/instruments");

router.post("/", upload.single("picture"), addInstrument);

module.exports = router;
