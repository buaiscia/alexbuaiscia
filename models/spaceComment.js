var mongoose = require("mongoose");

var commentSpaceSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model("Comment", commentSpaceSchema);