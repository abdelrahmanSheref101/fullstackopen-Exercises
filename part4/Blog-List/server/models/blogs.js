const { default: mongoose } = require("mongoose");
const { mongoUri } = require("../utils/config");
const { info } = require("../utils/logger");


const blogSchema = mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;
