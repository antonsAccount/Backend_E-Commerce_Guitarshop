const express = require("express");
const router = express.Router();
const upload = require("../services/upload");

const {
  addInstrument,
  updateInstrument,
  deleteInstrument,
} = require("../controllers/instruments");

router.post("/", upload.single("picture"), addInstrument);
router.post("/:id", upload.single("picture"), updateInstrument);
router.delete("/:id", deleteInstrument);

module.exports = router;
