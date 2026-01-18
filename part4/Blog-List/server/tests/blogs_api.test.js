const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");

const supertest = require("supertest");
const { default: mongoose } = require("mongoose");
const app = require("../app.js");

const Blog = require("../models/blogs.js")

const helper = require("./helper.js");
const { info } = require("../utils/logger.js");
const { initial } = require("lodash");
const { response } = require("express");

const api = supertest(app);

beforeEach(async () => {

        await Blog.deleteMany({});
        await Blog.insertMany(helper.initial_blogs);
});

const newBlog = {
        title: "new blog 101",
        author: "me",
        url: "nan",
        likes: "69"
}
const noLikesBlog = {
        title: "im a blog with no like , i should have zero in me",
        author: "some guy",
        url: "nan",
}

const noTitleBlog = {
        url: "some url",
        likes: "132"
}

const noUrlBlog = {
        title: "some title with no url",
        likes: "132"
}

describe("integration testing : blogs api", () => {
        test("getting all blogs", async () => {
                const response = await api.get("/api/blogs")
                        .expect(200);

                const blogs = response.body;
                assert.strictEqual(blogs.length, helper.initial_blogs.length)
        })

        test("unique id is named id not _id", async () => {

                const response = await api.get("/api/blogs")
                        .expect(200);
                const blogs = response.body;
                blogs.forEach(blog => {
                        assert.strictEqual(Object.keys(blog).includes("id"), true);
                        assert.strictEqual(Object.keys(blog).includes("_id"), false);

                });
        })

        test("successfull post a blog", async () => {
                await api.post("/api/blogs").send(newBlog).expect(201);
                const response = await api.get("/api/blogs");
                const contents = response.body;
                assert.strictEqual(response.body.length, helper.initial_blogs.length + 1)
                assert.strictEqual(contents.some((blog) =>
                        blog.title == newBlog.title && blog.author == newBlog.author && newBlog.url == blog.url && newBlog.likes == blog.likes
                ), true)
        })

        test("creating a note with no likes (expected to be with zero likes)", async () => {
                const resposne = await api.post("/api/blogs").send(noLikesBlog).expect(201);
                assert.strictEqual(response.body, false);
                assert.strictEqual(resposne.body["likes"], 0);
        })

        test("creating an invalid blog (no title)", async () => {

                const resposne = await api.post("/api/blogs").send(noTitleBlog).expect(400);
                assert.strictEqual(resposne.body, "Blog validation failed: title: title is required !");
        })

        test("creating an invalid blog (no url)", async () => {

                const resposne = await api.post("/api/blogs").send(noUrlBlog).expect(400);
                assert.strictEqual(resposne.body, "Blog validation failed: url: URL is required !");
        })

        describe('testing deletion',
                () => {

                        test("deleting a blog with valid id", async () => {
                                const id = helper.initial_blogs[2]._id;
                                await api.delete(`/api/blogs/${id}`).expect(204);
                                console.log("after deletion");
                                await api.get(`/api/blogs/${id}`).expect(404);

                        })

                        // test("deleting a blog with null id", async () => {
                        //
                        // })
                        //
                        // test("deleting a blog with invalid id", async () => {
                        //
                        // })
                })

        describe.only('testing updating a blog', () => {
                test('updating a blog with valid id', async () => {
                        const updatedBlog = {
                                author: "elsayd elbadawy",
                                likes: 69
                        }

                        const id = helper.initial_blogs[2]._id;

                        await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200);

                        const response = await api.get(`/api/blogs/${id}`).expect(200);

                        const blog = response.body;
                        assert.strictEqual(blog.author, updatedBlog.author);
                        assert.strictEqual(blog.likes, updatedBlog.likes);
                })
        })
})

after(async () => {
        await mongoose.connection.close();
})
