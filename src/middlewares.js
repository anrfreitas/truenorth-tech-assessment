const { checkAuthentication } = require('./middlewares/checkAuthentication');
const cache = require('./cache');

const middlewares = {
    checkAuthentication,
    cache,
};

module.exports = middlewares;