const { generateRandomString } = require('../../helpers/string');

class RandomString {

    executeOperation() {
        return generateRandomString();
    }
}

module.exports = RandomString;