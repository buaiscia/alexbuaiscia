const express = require("express"),
    router = express.Router();

// ROOT ROUTE

//INDEX
router.get("/", function(req, res) {

    res.render("dev/devlife");
});








module.exports = router;