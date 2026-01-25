const { default: mongoose } = require('mongoose');
const Blog = require('../models/blogs');
const { info } = require('../utils/logger');
const User = require('../models/users');
const blogsRouter = require('express').Router();
const { InvalidUser } = require('../errors/invalidUser');

const { UnAutherizedUserError } = require('../errors/unautherizedUserError');
const { userExtractor } = require('../utils/middleware');




blogsRouter.get("/", async (req, res) => {
        const blogs = await Blog.find({}).populate("author", "username");

        res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        res.json(blog);
});


blogsRouter.post("/", userExtractor, async (req, response) => {


        const blog = new Blog(req.body);


        blog.author = req.user._id;

        info("the user :: ", req.user);
        const savedBlog = await blog.save();
        info(req.user.blogs);
        req.user.blogs = req.user.blogs.concat(savedBlog._id);
        await req.user.save();


        response.status(201).json(savedBlog);
})

blogsRouter.delete("/:id", userExtractor, async (req, res) => {


        const blogId = req.params.id;




        if (!blogId)
                return res.status(404).json({
                        error: "EMPTY ID"
                })

        const blog = await Blog.findById(blogId);

        const logedInUserID = req.user._id.toString();

        info("logedin user id :: ", logedInUserID);
        info("logedin user id :: ", logedInUserID, " ", blog.author.toString());

        if (logedInUserID !== blog.author.toString())
                throw new UnAutherizedUserError();


        req.user.blogs = req.user.blogs.filter(b => b.toString() !== blog.id);


        await req.user.save();

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
