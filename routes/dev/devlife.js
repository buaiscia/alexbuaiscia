const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleware = require("../../middleware");



// ROOT ROUTE

//INDEX
router.get("/", function(req, res, next) {

    res.render("dev/devlife");
});








module.exports = router;