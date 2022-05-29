const express = require("express");
const cors = require("cors");
const UserModel = require("../models/user-model");
const cryptoJS = require("crypto-js");
const nanoid = require("nanoid");
const router = express.Router();

router.use(cors());

require("dotenv").config();

// router.get("/user", async (req, res) => {
//   const singleUser = await UserModel.findById(req.params.id);
//   if (req.session.loggedInUser) {
//     res.json({
//       userId: req.session.loggedInUser,
//       user: {
//         userId: singleUser.userId,
//         email: singleUser.email,
//         subscription: singleUser.subscription,
//       },
//     });
//     console.log(req.session.loggedInUser);
//   } else {
//     res.json("No user logged in");
//   }
// });

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
  console.log("Try");
  try {
    const userFromDB =
      (await UserModel.findOne({ email: req.body.email })) || "";

    if (req.body.email != null && req.body.password != null) {
      if (
        userFromDB.password ===
        cryptoJS.SHA256(req.body.password, process.env.SALT).toString()
      ) {
        // req.body.loggedInUser = {
        //   userId: userFromDB.userId,
        //   subscription: userFromDB.subscription,
        // };
        console.log("Inloggad");
        console.log(userFromDB.userId);
        console.log(userFromDB.subscription);
        res.json({
          userPost: {
            userId: userFromDB.userId,
            subscription: userFromDB.subscription,
          },
        });
        return;
      } else {
        console.log("Fel användarnamn eller lösenord");
        res.send("Failure");
        return;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return;
});

router.put("/change", (req, res) => {
  try {
    res.send(req.body);
    UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { subscription: req.body.subscription },
      () => {}
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
