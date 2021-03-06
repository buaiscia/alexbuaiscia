const mongoose = require("mongoose");

const postSpaceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("spacePost", postSpaceSchema);