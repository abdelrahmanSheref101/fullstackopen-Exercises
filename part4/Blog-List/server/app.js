const express = require('express');
const { default: mongoose } = require("mongoose");
const { mongoUri } = require("./utils/config");
const blogsRouter = require('./controllers/blogs');
const { info } = require('./utils/logger');
const { requestLogger, unknowEndpoint, errorHandler } = require('./utils/middleware');
const app = express();

mongoose.connect(mongoUri, { family: 4 }).then(res => {
        info("connected to MongoDB !");
}).catch(error => {
        info("ERROR:Cannot connect to MongoDB :", error);
});

//Middlewares
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger);

app.get('/', (request, response) => {
        response.send("<h1>HELLO WORLD!</h1>");
})

//Routers
app.use('/api/blogs', blogsRouter);

//Error handling
app.use(unknowEndpoint);
app.use(errorHandler)

module.exports = app;
