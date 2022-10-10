var express = require("express");
var router = express.Router();
const Insta = require("scraper-instagram");
const InstaClient = new Insta();

const ig = require("instagram-scraping");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/profile", function (req, res, next) {
  res.render("profile");
});

router.post("/data", function (req, res, next) {
  // InstaClient.authBySessionId('11551587099%3A1ZVTyGu8tGrCkv%3A14%3AAYcaPIeI4C3GK5kcrz-OfV7W4Nnkezwkd6TKByLd2g')
  //   .then((account) => res.json({ success: true, account }))
  //   .catch((err) => res.json({ success: false, msg: err }));
  const username = req.body.username;
  InstaClient.getProfile('developer_n_designer')
    .then((profile) => res.json({ success: true, profile }))
    .catch((err) => res.json({ success: false, msg: err }));
});

module.exports = router;
