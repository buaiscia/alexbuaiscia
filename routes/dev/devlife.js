const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    // moment = require("moment"),
    // spacePost = require("../../models/spacePost"),
    middleware = require("../../middleware");
// seedDB = require("../../seeds");


// function paginate(req, res, next) {
//     var perPage = 6;
//     var page = req.params.page;
//     spacePost.find({})
//         .sort({ createdOn: -1 })
//         .skip(perPage * page)
//         .limit(perPage)
//         .exec(function(err, allPosts) {
//             if (err) {
//                 console.log(err);
//                 return next(err.message);
//             }
//             spacePost.estimatedDocumentCount().exec(function(err, count) {
//                 if (err) return next(err.message);
//                 res.render("space/spaceblog", {
//                     spacePosts: allPosts,
//                     pages: count / perPage,
//                     page: 'spaceblog'
//                 });
//             });

//         });
// }

// ROOT ROUTE

//INDEX - show all space posts
router.get("/", function(req, res, next) {
    //get space posts from DB
    res.render("dev/devlife");
});





module.exports = router;