const { default: mongoose, Mongoose } = require("mongoose");
const { mongoUri } = require("../utils/config");
const { info } = require("../utils/logger");

const usersSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true,
                minLength: 3,
                required: [true, "username required"],
                unique: true,
        },
        passwordHash: {
                type: String,
        },
        blogs: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog',
                default: [],
        }]
});


usersSchema.set('toJSON', {
        transform: (doc, returnedObject) => {
                returnedObject.id = returnedObject._id.toString(),
                        delete returnedObject._id,
                        delete returnedObject.__v,
                        delete returnedObject.passwordHash

        }
});

const User = mongoose.model("User", usersSchema);

module.exports = User;

