var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors());
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model");

const adminLogin = {
  username: "admin",
  password: "admin",
};

/* GET users listing. */
router.get("/", async (req, res) => {
  res.send("Hello from GET");
});

router.post("/", async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;
