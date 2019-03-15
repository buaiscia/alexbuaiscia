const mongoose = require("mongoose");

const postDevSchema = new mongoose.Schema({
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
        ref: "devComment"
    }]
});

module.exports = mongoose.model("devPost", postDevSchema);