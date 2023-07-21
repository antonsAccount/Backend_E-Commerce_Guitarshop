const express = require("express");
const router = express.Router();
const upload = require("../services/upload");

const {
  addInstrument,
  getAllInstruments,
  updateInstrument,
  deleteInstrument,
} = require("../controllers/instruments");

router.get("/", getAllInstruments);
router.post("/", upload.single("picture"), addInstrument);
router.put("/:id", upload.single("picture"), updateInstrument);
router.delete("/:id", deleteInstrument);

module.exports = router;
