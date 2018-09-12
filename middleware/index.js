var spacePost = require("../models/spacePost");
var Comment = require("../models/spaceComment");

// all the middlware goes here
var middlewareObj = {};

middlewareObj.checkSpacePostOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        spacePost.findById(req.params.id, function(err, foundPost) {
            if (err || !foundPost) {
                req.flash("error", "Post not found")
                res.redirect("back");
            } else {
                // does user own the post?
                if (foundPost.author.id.equals(req.user._id) || req.user.username === "alex") {
                    next();
                } else {
                    req.flash("error", "You have no permissions");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id) || req.user.username === "alex") {
                    next();
                } else {
                    req.flash("error", "You have no permissions");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;