const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const UserModel = require("../models/user-model");
loggedIn = false;

let subbedUsers = [];
let notSubbedUsers = [];

/* GET users listing. */
router.get("/", (req, res) => {
  let form = `<form action="admin/login" method="post">
  <h2>Logga in</h2>
  <div>
  Användarnamn: 
  <input type="text" name="name">
  </div>
  <div>
  Lösenord: 
  <input type="password" name="password">
  </div>
  <div>
  <button type="submit">Logga in</button>
  </div>
</form>`;
  res.send(form);
});

router.post("/login", (req, res) => {
  if (req.body.name === "admin" && req.body.password === "admin") {
    loggedIn = true;
    res.redirect("/admin/loggedin");
  } else {
    res.send("Fel användarnamn eller lösenord");
  }
});

router.get("/loggedin", async (req, res) => {
  if ((loggedIn = true)) {
    console.log("admin inloggad");

    const regUsers = await UserModel.find();
    let logout = `<a href="/admin">Log out</a>`;
    let users = "<div>";

    let titel1 = "<h1> Här är alla som subbar</h1>";

    let titel2 = "<h1> Här är alla som inte subbar</h1>";
    notSubbedUsers = [];
    subbedUsers = [];

    for (let i = 0; i < regUsers.length; i++) {
      if (!regUsers[i].subscription) {
        notSubbedUsers.push(" " + regUsers[i].email);
      } else {
        subbedUsers.push(" " + regUsers[i].email);
      }
    }
    res.send(
      logout + users + titel1 + subbedUsers + titel2 + notSubbedUsers + "</div>"
    );
  } else {
    res.redirect("/admin");
    loggedIn = false;
  }
});

module.exports = router;
