const morgan = require("morgan");
const { info, error } = require("./logger");
const { default: mongoose } = require("mongoose");
const { InvalidId } = require("../errors/invalidId");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { UnAutherizedUserError } = require("../errors/unautherizedUserError");
const User = require("../models/users");
const { InvalidUser } = require("../errors/invalidUser");


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
        if (err.name === "ValidationError")
                res.status(400).json({ error: err.message });
        else if (err.name === "JsonWebTokenError")
                res.status(401).json({ error: err.message });
        else if (err.name === "TokenExpiredError")
                res.status(401).json({ error: "token expired" });

        if (err.code === 11000) {
                const field = Object.keys(err.keyValue)[0];
                const value = err.keyValue[field];
                res.status(409).json({ error: `${field} ${value} already exists` });
        }

        if (err.isOperational) {
                res.status(err.statusCode).json(err.message);
        }

        next(err);
}

const asyncHandler = (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
};

const tokenExtractor = (req, res, next) => {
        const authorization = req.get('authorization')
        if (authorization && authorization.startsWith('Bearer '))
                req.token = authorization.replace('Bearer ', "")
        next();
}
const validateObjectId = (req, res, next) => {
        const { id } = req.params;


        if (id && !mongoose.Types.ObjectId.isValid(id))
                throw new InvalidId("Formate ERROR : Invalid ID formate");

        next();
}

const userExtractor = async (req, res, next) => {
        const decodedToken = jwt.verify(req.token, SECRET);

        if (!decodedToken)
                throw new UnAutherizedUserError();

        const user = await User.findById(decodedToken.id);

        if (!user)
                throw new InvalidUser();

        req.user = user;

        next();
}

module.exports = { requestLogger, unknowEndpoint, errorHandler, asyncHandler, validateObjectId, tokenExtractor, userExtractor };
