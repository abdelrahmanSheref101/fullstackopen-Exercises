class UnAutherizedUserError extends Error {
        constructor(message) {
                super(message);
                this.statusCode = 401;
                this.isOperational = true;
        }
}
module.exports = { UnAutherizedUserError };
