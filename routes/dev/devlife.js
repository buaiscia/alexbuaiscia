const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleware = require("../../middleware");



// ROOT ROUTE

//INDEX
router.get("/", function(req, res, next) {

    res.render("dev/devlife");
});



router.get('/portfolio/', function(req, res, next) {
    res.render("dev/portfolio");
})




module.exports = router;