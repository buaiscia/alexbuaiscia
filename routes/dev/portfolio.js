const express = require("express"),
    router = express.Router();


// ROOT ROUTE

//INDEX
router.get("/", function(req, res) {

    res.render("dev/portfolio");
});

//PROJECTS

router.get("/website", function(req, res) {

    res.render("dev/portfolio/website");
});


router.get("/deploymentTool", function(req, res) {

    res.render("dev/portfolio/deploymentTool");
});


router.get("/portal", function(req, res) {

    res.render("dev/portfolio/portal");
});

router.get("/movieDB", function(req, res) {

    res.render("dev/portfolio/movieDB");
});

router.get("/restApi", function(req, res) {

    res.render("dev/portfolio/restApi");
});







module.exports = router;