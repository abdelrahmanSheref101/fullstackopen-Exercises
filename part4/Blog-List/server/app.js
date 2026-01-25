const express = require('express');
const { default: mongoose } = require("mongoose");
const { mongoUri } = require("./utils/config");
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const { info } = require('./utils/logger');
const { requestLogger, unknowEndpoint, errorHandler, validateObjectId, tokenExtractor } = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const app = express();

mongoose.connect(mongoUri, { family: 4 }).then(res => {
        info("connected to MongoDB !");
}).catch(error => {
        info("ERROR:Cannot connect to MongoDB :", error);
});

//Middlewares
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);
app.use(validateObjectId);
app.use(tokenExtractor)

app.get('/', (request, response) => {
        response.send("<h1>HELLO WORLD!</h1>");
})

//Routers
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

//Error handling
app.use(unknowEndpoint);
app.use(errorHandler)

module.exports = app;
