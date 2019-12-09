const express = require("express"),
    router = express.Router();


// ROOT ROUTE

//INDEX
router.get("/", function(req, res, next) {

    res.render("dev/portfolio");
});







module.exports = router;