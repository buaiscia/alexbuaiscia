const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    spacePost = require("../../models/spacePost"),
    seedDB = require("../../seeds");


// ROOT ROUTE

//INDEX - show all space posts
router.get("/", function(req, res) {
    //get space posts from DB
    spacePost.find({}, function(err, allPosts) {
        if (err) {
            console.log(err);
        } else {
            res.render("space/spaceblog", { spacePosts: allPosts });

        }
    });
});

// CREATE POST 

router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {
        name: name,
        image: image,
        description: description,
        text: text,
        author: author
    }
    spacePost.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/spaceblog")

        }
    })
});

//FORM FOR NEW POST

router.get("/new", isLoggedIn, function(req, res) {
    res.render("space/newPost");
});

// GET COMPLETE POST

router.get("/:id", function(req, res) {
    spacePost.findById(req.params.id).populate("comments").exec(function(err, foundSpacePost) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundSpacePost)
            res.render("space/showSpacePost", { spacePost: foundSpacePost });
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;