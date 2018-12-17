const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleware = require("../../middleware");

router.get("/", function(req, res, next) {
    res.render("dev/devblog");
});



module.exports = router;