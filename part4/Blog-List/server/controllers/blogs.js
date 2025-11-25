const Blog = require('../models/blogs');

const blogsRouter = require('express').Router();

//get all blogs
//post a blog

blogsRouter.get("/", (req, res) => {
        Blog.find({}).then((blogs) => {
                res.json(blogs)
        });
});

blogsRouter.post("/", (req, response) => {
        const blog = new Blog(req.body);
        blog.save().then(result => {
                response.status(201).json(result)
        })
})


module.exports = blogsRouter;
