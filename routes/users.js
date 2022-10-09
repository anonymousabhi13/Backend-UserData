var express = require("express");
var router = express.Router();
const instascrap = require("../insta_scrap");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/info", function (req, res, next) {
  instascrap
    .getReport(req.body.username)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
