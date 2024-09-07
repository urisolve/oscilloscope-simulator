//* Routes to render pages.
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("layouts/homepage");
});
router.get("/support", function (req, res) {
  res.render("layouts/support");
});

module.exports = router;
