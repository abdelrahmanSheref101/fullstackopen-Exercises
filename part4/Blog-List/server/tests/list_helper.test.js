const { test, describe } = require("node:test")
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const oneBlogList = [
        {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
        }

];


const blogs = [
        {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
        },
        {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
        },
        {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
        },
        {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
        },
        {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
        },
        {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
        }
]

describe('testing dummy : ', () => {
        test('dummy returns one', () => {
                const result = listHelper.dummy();
                assert(result, 1);
        })
})

describe('favourit blog :', () => {


        test("testing with one blog ", () => {
                const favBlog = listHelper.favBlog(oneBlogList);
                assert.deepStrictEqual(favBlog, oneBlogList[0]);
        })


        test("testing with multiple blogs", () => {
                assert.deepStrictEqual(listHelper.favBlog(blogs), blogs[2]);
        })
})


describe("total likes :", () => {
        test('when list has only one blog, equals the likes of that', () => {
                const result = listHelper.totalLikes(oneBlogList);
                assert(result, 5);
        });
        test("testing totalLikes with multiple files", () => {
                const result = listHelper.totalLikes(blogs);
                assert(result, 34);
        })

})


describe("author with most blogs", () => {
        test('testing list with one blog', () => {
                assert(listHelper.mostBlogs(oneBlogList), 'Michael Chan');
        })

        test('testing list with multiple blogs', () => {
                assert(listHelper.mostBlogs(blogs), 'Robert C. Martin');
        })
})

describe("most liked blogs : ", () => {
        test('testing list with one blog', () => {
                assert.deepStrictEqual(listHelper.mostLikes(oneBlogList), { author: "Michael Chan", likes: 7 });
        })

        test('testing list with multiple blogs', () => {
                assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 });
        })

})

