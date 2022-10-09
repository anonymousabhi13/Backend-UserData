var express = require("express");
var router = express.Router();

const ig = require("instagram-scraping");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "instagram scraping" });
});
router.post("/info", function (req,res,next) {
  ig.scrapeUserPage(req.body.username)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
