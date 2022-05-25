const express = require("express");
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());
const cors = require("cors");
const UserModel = require("../models/user-model");
const cryptoJS = require("crypto-js");
const nanoid = require("nanoid");

const router = express.Router();
router.use(cors());
// const mongodb = require("mongodb");
// const mongoose = require("mongoose");
require("dotenv").config();

/* GET users listing. */
router.get("/", async (req, res) => {
  res.send("Hello from GET");
});

router.post("/", async (req, res) => {
  try {
    let user = {
      userId: nanoid.nanoid(),
      email: req.body.email,
      password: cryptoJS.SHA256(req.body.password, process.env.SALT).toString(),
      subscription: req.body.subscription,
    };
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userFromDB =
      (await UserModel.findOne({ email: req.body.email })) || "";

    if (req.body.email != null && req.body.password != null) {
      if (
        userFromDB.password ===
        cryptoJS.SHA256(req.body.password, process.env.SALT).toString()
      ) {
        console.log("Inloggad");
        console.log(userFromDB.userId);
        console.log(userFromDB.subscription);
        res.json({
          userPost: {
            userId: userFromDB.userId,
            subscription: userFromDB.subscription,
          },
        });
      } else {
        console.log("Fel användarnamn eller lösenord");
        res.send("Failure");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/change", (req, res) => {
  try {
    res.send(req.body);
    UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { subscription: req.body.subscription },
      () => {}
    ); //only executes if callback is provided
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
