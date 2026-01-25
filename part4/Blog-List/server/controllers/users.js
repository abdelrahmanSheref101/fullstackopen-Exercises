const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/users');
const { asyncHandler } = require('../utils/middleware');
const { info } = require('../utils/logger');
const { ConflictError } = require("../errors/conflictError")

//base url : /api/users

usersRouter.post('/', asyncHandler(async (req, res) => {

        const { username, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
                username,
                passwordHash
        })

        if (password.length < 3) {
                throw new ConflictError("Error invalid password : Password is shorter than 3 chars");
        }

        const savedUser = await user.save();

        res.status(201).json(savedUser);
}));

usersRouter.get('/', async (req, res) => {
        const users = await User.find({}).populate("blogs", "-likes");

        res.status(200).json(users);
});

module.exports = usersRouter;
