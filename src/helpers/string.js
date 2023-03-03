var crypto = require("crypto");

function generateRandomString() {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = { generateRandomString };
