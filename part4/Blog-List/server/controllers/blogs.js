const { default: mongoose } = require('mongoose');
const Blog = require('../models/blogs');
const { info } = require('../utils/logger');
const { update } = require('lodash');
const blogsRouter = require('express').Router();

//get all blogs
//post a blog

blogsRouter.get("/", async (req, res) => {
        const blogs = await Blog.find({});
        res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        res.json(blog);
});

blogsRouter.post("/", async (req, response) => {

        const blog = new Blog(req.body);
        if (!blog.likes) {
                blog.likes = 0;
        }
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
})

blogsRouter.delete("/:id", async (req, res) => {


        const blogId = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(blogId))
                return res.status(404).json({
                        error: "INVALID ID"
                })

        if (!blogId)
                return res.status(404).json({
                        error: "EMPTY ID"
                })

        const result = await Blog.findByIdAndDelete(blogId);

        if (!result) {
                return res.status(404).json({
                        error: "not found blog"
                })
        }


        return res.sendStatus(204);
})


blogsRouter.put('/:id', async (req, res) => {
        const updatedBlog = req.body;
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId))
                return res.sendStatus(404).json({
                        error: "INVALID ID"
                });
        if (!updatedBlog)
                return res.sendStatus(404).json({
                        name: "empty updates",
                        error: "the updates are empty , can't update"
                });

        // info("blog id and updated blod ::  ", blogId, " : ", updatedBlog)
        const blog = await Blog.findByIdAndUpdate(blogId, updatedBlog, {
                new: true,
                runValidators: true
        })
        return res.json(blog);
})


module.exports = blogsRouter;
