var express = require("express"),
    router = express.Router();


// ROOT ROUTE

router.get("/", function(req, res) {
    res.render("landing");
});





module.exports = router;