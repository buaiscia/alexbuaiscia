var mongoose = require("mongoose");

var commentSpaceSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSpaceSchema);