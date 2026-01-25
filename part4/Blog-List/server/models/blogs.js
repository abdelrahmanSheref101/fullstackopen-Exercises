const { default: mongoose } = require("mongoose");
const { mongoUri } = require("../utils/config");
const { info } = require("../utils/logger");


const blogSchema = mongoose.Schema({
        title: {
                type: String,
                required: [true, "title is required !"]
        },
        author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, "user is required"]
        },
        url: {
                type: String,
                required: [true, "URL is required !"]
        },
        likes: {
                type: Number,
                default: 0,
        },
});

blogSchema.set('toJSON', {
        transform: (document, returnedObject) => {
                if (document._id)
                        returnedObject.id = document._id.toString();
                delete returnedObject._id
                delete returnedObject.__v
        }

});



const Blog = mongoose.model('Blog', blogSchema);



module.exports = Blog;
