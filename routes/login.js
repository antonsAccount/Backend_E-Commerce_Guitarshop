const express = require("express");
const router = express.Router();

const { login, updateUser } = require("../controllers/login");

router.route("/").post(login);
router.route("/:id").put(updateUser);
module.exports = router;
