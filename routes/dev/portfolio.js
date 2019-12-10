const express = require("express"),
    router = express.Router();


// ROOT ROUTE

//INDEX
router.get("/", function(req, res, next) {

    res.render("dev/portfolio");
});

//PROJECTS

router.get("/website", function(req, res, next) {

    res.render("dev/portfolio/website");
});


router.get("/deploymentTool", function(req, res, next) {

    res.render("dev/portfolio/deploymentTool");
});


router.get("/portal", function(req, res, next) {

    res.render("dev/portfolio/portal");
});







module.exports = router;