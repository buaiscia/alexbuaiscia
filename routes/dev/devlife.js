const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    middleware = require("../../middleware");


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

//INDEX - 
router.get("/", function(req, res, next) {

    res.render("dev/devlife");
});








module.exports = router;