var mongoose = require("mongoose");

var postSpaceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    text: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("spacePost", postSpaceSchema);