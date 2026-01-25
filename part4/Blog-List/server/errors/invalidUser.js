class InvalidUser extends Error {
        constructor() {
                super("missing or invalid user ID");
                this.statusCode = 400;
                this.isOperational = true;
        }
}

module.exports = { InvalidUser }
