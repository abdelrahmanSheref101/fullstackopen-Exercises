class InvalidId extends Error {
        constructor(message) {
                super(message);
                this.statusCode = 400;
                this.isOperational = true;
        }
}

module.exports = { InvalidId };
