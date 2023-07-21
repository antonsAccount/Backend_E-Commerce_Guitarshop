const express = require("express");
const app = express();
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");

const { login, updateUser, deleteUser } = require("../controllers/login");

router.route("/").post(login);
app.use(requireAuth);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);
module.exports = router;
