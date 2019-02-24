const express = require("express"),
    router = express.Router({ mergeParams: true }),
    bodyParser = require("body-parser"),
    devPost = require("../../models/devPost"),
    devComment = require("../../models/devComment"),
    middleware = require("../../middleware");



// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    devPost.findById(req.params.id, function(err, devPost) {
        if (err || !devPost) {
            req.flash("error", "Post not found")
            res.redirect("back");
        } else {
            res.render("devcomment/new", { devPost: devPost });
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    devPost.findById(req.params.id, function(err, devPost) {
        if (err) {
            res.redirect("/devblog");
        } else {
            devComment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    devPost.comments.push(comment);
                    devPost.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/devblog/' + devPost._id);
                }
            });
        }
    });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkDevCommentOwnership, function(req, res) {
    devPost.findById(req.params.id, function(err, foundDevPost) {
        if (err || !foundDevPost) {
            req.flash("error", "Post not found");
            return res.redirect("back");
        }
        devComment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                res.render("devcomment/edit", { devPost_id: req.params.id, comment: foundComment });
            }
        });
    });

});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkDevCommentOwnership, function(req, res) {
    devComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated");
            res.redirect("/devblog/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkDevCommentOwnership, function(req, res) {
    //findByIdAndRemove
    devComment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/devblog/" + req.params.id);
        }
    });
});


module.exports = router;