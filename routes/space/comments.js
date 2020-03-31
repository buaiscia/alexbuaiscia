const express = require("express"),
    router = express.Router({ mergeParams: true }),
    spacePost = require("../../models/spacePost"),
    Comment = require("../../models/spaceComment"),
    middleware = require("../../middleware");



// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    spacePost.findById(req.params.id, function(err, spacePost) {
        if (err || !spacePost) {
            req.flash("error", "Post not found");
            res.redirect("back");
        } else {
            res.render("comments/new", { spacePost: spacePost });
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    spacePost.findById(req.params.id, function(err, spacePost) {
        if (err) {
            res.redirect("/spaceblog");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    spacePost.comments.push(comment);
                    spacePost.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/spaceblog/" + spacePost._id);
                }
            });
        }
    });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    spacePost.findById(req.params.id, function(err, foundSpacePost) {
        if (err || !foundSpacePost) {
            req.flash("error", "Post not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                res.render("comments/edit", { spacePost_id: req.params.id, comment: foundComment });
            }
        });
    });

});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated");
            res.redirect("/spaceblog/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/spaceblog/" + req.params.id);
        }
    });
});


module.exports = router;