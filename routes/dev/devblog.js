const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    moment = require("moment"),
    devPost = require("../../models/devPost"),
    middleware = require("../../middleware");
// seedDB = require("../../seeds");


function paginate(req, res, next) {
    var perPage = 6;
    var page = req.params.page;
    devPost.find({})
        .sort({ createdOn: -1 })
        .skip(perPage * page)
        .limit(perPage)
        .exec(function(err, allPosts) {
            if (err) {
                console.log(err);
                return next(err.message);
            }
            devPost.estimatedDocumentCount().exec(function(err, count) {
                if (err) return next(err.message);
                res.render("dev/devblog", {
                    devPosts: allPosts,
                    pages: count / perPage,
                    page: 'devblog'
                });
            });

        });
}

// ROOT ROUTE

//INDEX - show all dev posts
router.get("/", function(req, res, next) {
    //get dev posts from DB
    paginate(req, res, next);
});

router.get("/page/:page", function(req, res, next) {
    paginate(req, res, next);
})

// CREATE POST 

router.post("/", middleware.isLoggedIn, function(req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    }


    var postedTime = req.body.date;
    let createdOn = moment(postedTime).toString();
    console.log(createdOn);

    var newPost = {
        name: name,
        image: image,
        description: description,
        text: text,
        author: author,
        createdOn: createdOn
    }
    devPost.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/devblog")

        }
    })
});

//FORM FOR NEW POST

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("dev/newPost");
});

// GET COMPLETE POST

router.get("/:id", function(req, res) {
    devPost.findById(req.params.id).populate("comments").exec(function(err, foundDevPost) {
        if (err || !foundDevPost) {
            req.flash("error", "Post not found");
            res.redirect("back");
        } else {
            console.log(foundDevPost)
            res.render("dev/showPost", { devPost: foundDevPost });
        }
    });
});

// EDIT POST ROUTE

router.get("/:id/edit", middleware.checkDevPostOwnership, function(req, res) {
    devPost.findById(req.params.id, function(err, foundDevPost) {
        res.render("dev/edit", { devPost: foundDevPost });
    })
})

// UPDATE POST ROUTE

router.put("/:id", middleware.checkDevPostOwnership, function(req, res) {
    devPost.findByIdAndUpdate(req.params.id, req.body.devPost, function(err, updatedDevPost) {
        if (err) {
            res.redirect("/devblog");
        } else {
            res.redirect("/devblog/" + req.params.id);
        }
    });
});

// DESTROY POST ROUTE

router.delete("/:id", middleware.checkDevPostOwnership, function(req, res) {
    devPost.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/devblog");
        } else {
            req.flash("success", "Post deleted");
            res.redirect("/devblog");
        }
    })
})





module.exports = router;