const { default: mongoose } = require("mongoose");

const initial_blogs = [
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Understanding JavaScript Closures", author: "Alice Nguyen", url: "https://example.com/js-closures", likes: 42
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "A Practical Guide to Node Streams", author: "Ben Carter", url: "https://example.com/node-streams", likes: 27
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Styling React Apps with CSS Modules", author: "Carla Mendes", url: "https://example.com/react-css-modules", likes: 13
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Postgres vs MongoDB: When to Use Which", author: "Diego Alvarez", url: "https://example.com/postgres-vs-mongo", likes: 98
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Testing Express Routes with Supertest", author: "Eve Johnson", url: "https://example.com/supertest-express", likes: 5
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "10 Tips for Writing Readable Code", author: "Fatima Z.", url: "https://example.com/readable-code", likes: 72
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "An Intro to Docker for Developers", author: "George Li", url: "https://example.com/docker-intro", likes: 34
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Handling File Uploads in Node", author: "Hanna Park", url: "https://example.com/node-file-uploads", likes: 9
        },
        {
                _id: new mongoose.Types.ObjectId(),
                _id: new mongoose.Types.ObjectId(),
                title: "GraphQL vs REST: A Practical Comparison", author: "Ivan Petrov", url: "https://example.com/graphql-vs-rest", likes: 56
        },
        {
                _id: new mongoose.Types.ObjectId(),
                title: "Deploying a Node App to DigitalOcean", author: "Jane Smith", url: "https://example.com/deploy-node-do", likes: 21
        }
];

module.exports = { initial_blogs }
