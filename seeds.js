var mongoose = require("mongoose");
var spacePost = require("./models/spacePost.js");
var Comment = require("./models/spaceComment.js");

var data = [{
        name: "Supernova",
        image: "https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAwNC8yMTAvb3JpZ2luYWwvMDgwNjAzLWlvZC1zdXBlcm5vdmEtMDIuanBn",
        description: "Questa é una supernova",
        text: "blabla1"
    },
    {
        name: "Galaxy",
        image: "https://www.nationalgeographic.com/content/dam/science/photos/000/010/1086.ngsversion.1491440409220.adapt.1900.1.jpg",
        description: "Questa é una galassia",
        text: "blabla2"
    },
    {
        name: "Sun",
        image: "https://images.interactives.dk/files/bonnier-ill/pictures/solstorm.jpg?auto=compress&ch=Width%2CDPR&ixjsv=2.2.4&rect=27%2C0%2C1445%2C1000&w=750",
        description: "Questo e'il sole",
        text: "blabla3"
    }
];

function seedDB() {
    //Remove all campgrounds
    spacePost.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed space posts!");
        //add a few campgrounds
        data.forEach(function(seed) {
            spacePost.create(seed, function(err, spacePost) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a space post");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            spacePost.comments.push(comment);
                            spacePost.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;