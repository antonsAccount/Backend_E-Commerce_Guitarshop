require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const cors = require("cors");
// const multer = require("multer");
const connectDB = require("./dbinit");
connectDB();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const requireAuth = require("./middlewares/requireAuth");
const signup = require("./routes/signup");
const login = require("./routes/login");
const instruments = require("./routes/instruments");
app.use("/signup", signup);
app.use("/login", login);
app.use("/instruments", instruments);

app.get("/", (req, res) => {
  res.send("<div><h2>Welcome to the API of Antons Rare Guitars</h2></div>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`.bgGreen);
});
