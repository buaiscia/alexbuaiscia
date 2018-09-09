var express = require("express"),
    router = express.Router();
var bodyParser = require("body-parser"),
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

router.post("/", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var text = req.body.text;
    var newPost = { name: name, image: image, description: description, text: text };
    spacePost.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/spaceblog")

        }
    })
});


router.get("/new", function(req, res) {
    res.render("space/newPost");
});


router.get("/:id", function(req, res) {
    spacePost.findById(req.params.id).populate("comments").exec(function(err, foundSpacePost) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundSpacePost)
                //render show template with that campground
            res.render("space/showSpacePost", { spacePost: foundSpacePost });
        }
    });
});


module.exports = router;