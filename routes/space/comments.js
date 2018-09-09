const express = require("express"),
    router = express.Router({ mergeParams: true }),
    bodyParser = require("body-parser"),
    spacePost = require("../../models/spacePost"),
    Comment = require("../../models/spaceComment");


// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", function(req, res) {
    spacePost.findById(req.params.id, function(err, spacePost) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { spacePost: spacePost });
        }
    })
});

router.post("/", function(req, res) {
    spacePost.findById(req.params.id, function(err, spacePost) {
        if (err) {
            console.log(err);
            res.redirect("/spaceblog");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    spacePost.comments.push(comment);
                    spacePost.save();
                    res.redirect('/spaceblog/' + spacePost._id);
                }
            });
        }
    });

});


module.exports = router;