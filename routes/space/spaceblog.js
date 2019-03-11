const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    moment = require("moment"),
    spacePost = require("../../models/spacePost"),
    middleware = require("../../middleware"),
    fs = require('fs');

// seedDB = require("../../seeds");


function paginate(req, res, next) {
    var perPage = 6;
    var page = req.params.page;
    spacePost.find({})
        .sort({ createdOn: -1 })
        .skip(perPage * page)
        .limit(perPage)
        .exec(function(err, allPosts) {
            if (err) {
                console.log(err);
                return next(err.message);
            }
            spacePost.estimatedDocumentCount().exec(function(err, count) {
                if (err) return next(err.message);
                res.render("space/spaceblog", {
                    spacePosts: allPosts,
                    pages: count / perPage,
                    page: 'spaceblog'
                });
            });

        });
}

// ROOT ROUTE

//INDEX - show all space posts
router.get("/", function(req, res, next) {
    //get space posts from DB
    paginate(req, res, next);
});

router.get("/page/:page", function(req, res, next) {
    paginate(req, res, next);
})

// CREATE POST 

router.post("/", middleware.isLoggedIn, function(req, res) {

    var name = req.body.name;
    var image = req.body.image_name;
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
    spacePost.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/spaceblog")

        }
    })
});

//UPLOAD IMAGE ROUTE

router.post('/upload_images', (req, res, next) => {
    let formidable = require('formidable');
    //parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/img';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; // 10 MB
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                results: "failed",
                data: {},
                message: `Cannot upload image. Error is ${err}`
            });
        }
        var arrayOfFiles = files[""];
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach(eachfile => {
                // fileNames.push(eachfile.path);
                fileNames.push(eachfile.path.split('\\')[2]);
            });
            res.json({
                result: "ok",
                data: fileNames,
                numberOfImages: fileNames.length,
                message: "Images uploaded successfully"
            });
        } else {
            res.json({
                result: "failed",
                data: {},
                numberOfImages: 0,
                message: "No images to upload"
            });
        }
    })

});


//FORM FOR NEW POST

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("space/newPost");
});

// GET COMPLETE POST

router.get("/:id", function(req, res) {
    spacePost.findById(req.params.id).populate("comments").exec(function(err, foundSpacePost) {
        if (err || !foundSpacePost) {
            req.flash("error", "Post not found");
            res.redirect("back");
        } else {
            console.log(foundSpacePost)
            res.render("space/showSpacePost", { spacePost: foundSpacePost });
        }
    });
});

// EDIT POST ROUTE

router.get("/:id/edit", middleware.checkSpacePostOwnership, function(req, res) {
    spacePost.findById(req.params.id, function(err, foundSpacePost) {
        res.render("space/edit", { spacePost: foundSpacePost });
    })
})

// UPDATE POST ROUTE

router.put("/:id", middleware.checkSpacePostOwnership, function(req, res) {
    spacePost.findByIdAndUpdate(req.params.id, req.body.spacePost, function(err, updatedSpacePost) {
        if (err) {
            res.redirect("/spaceblog");
        } else {
            res.redirect("/spaceblog/" + req.params.id);
        }
    });
});

// DESTROY POST ROUTE

router.delete("/:id", middleware.checkSpacePostOwnership, function(req, res) {
    spacePost.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/spaceBlog");
        } else {
            req.flash("success", "Post deleted");
            res.redirect("/spaceBlog");
        }
    })
})





module.exports = router;