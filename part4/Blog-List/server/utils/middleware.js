const morgan = require("morgan");
const { info, error } = require("./logger");


morgan.token('body', (req) => JSON.stringify(req.body));
const requestLogger = (req, res, next) => {
        morgan(':method :url :status :res[content-length] - :response-time ms :body');
        next();
}

const unknowEndpoint = (req, res, next) => {
        error("ERROR: recived unknowEndpoint");
        res.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (err, req, res, next) => {
        error("we got an error :: ", err);
        next(err);
}

module.exports = { requestLogger, unknowEndpoint, errorHandler };
