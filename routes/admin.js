var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors());
const mongodb = require("mongodb");
const mongoose = require("mongoose");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Admin");
});

module.exports = router;
