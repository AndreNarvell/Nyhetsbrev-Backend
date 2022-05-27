const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());

require("dotenv").config();

async function init() {
  try {
    await mongoose.connect(process.env.MONGOATLAS);
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
  }
}

init();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    secret: "secretKey",
    // maxAge: 1000 * 10,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // sameSite: "none",
    // httpOnly: false,
    // secure: false,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

module.exports = app;
