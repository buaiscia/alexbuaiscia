var express = require("express"),
    router = express.Router();
var bodyParser = require("body-parser"),
    spacePost = require("../../models/spacePost"),
    seedDB = require("../../seeds");



// var posts = [
//     { name: "Supernova", image: "https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAwNC8yMTAvb3JpZ2luYWwvMDgwNjAzLWlvZC1zdXBlcm5vdmEtMDIuanBn", description: "Questa é una supernova", text: "blabla1" },
//     { name: "Galaxy", image: "https://www.nationalgeographic.com/content/dam/science/photos/000/010/1086.ngsversion.1491440409220.adapt.1900.1.jpg", description: "Questa é una galassia", text: "blabla2" },
//     { name: "Sun", image: "https://images.interactives.dk/files/bonnier-ill/pictures/solstorm.jpg?auto=compress&ch=Width%2CDPR&ixjsv=2.2.4&rect=27%2C0%2C1445%2C1000&w=750", description: "Questo e'il sole", text: "blabla3" }
// ]


// ROOT ROUTE

//INDEX - show all space posts
router.get("/", function(req, res) {
    //get space posts from DB
    spacePost.find({}, function(err, allPosts) {
        if (err) {
            console.log(err);
        } else {
            res.render("spaceblog", { spacePosts: allPosts });

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
    res.render("newPost");
});


router.get("/:id", function(req, res) {
    spacePost.findById(req.params.id).populate("comments").exec(function(err, foundSpacePost) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundSpacePost)
                //render show template with that campground
            res.render("show", { spacePost: foundSpacePost });
        }
    });
});


module.exports = router;