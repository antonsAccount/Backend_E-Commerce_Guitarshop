const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/requireAuth");

const { login, updateUser, deleteUser } = require("../controllers/login");

router.route("/").post(login);
router.use(requireAuth);
router.use((req, res, next) => {
  console.log("Test Middleware");
  next();
});
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);
module.exports = router;
