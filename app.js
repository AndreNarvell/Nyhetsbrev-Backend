const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("mongodb://127.0.0.1:27017", {
//   useUnifiedTopology: true,
// }).then((client) => {
//   console.log("Vi är uppkopplade mot databasen");

//   const db = client.db("users");
//   app.locals.db = db;
// });

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

module.exports = app;
