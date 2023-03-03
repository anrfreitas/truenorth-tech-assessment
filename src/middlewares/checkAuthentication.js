const NodeCache = require('node-cache');
const config = require('../config/config');
const cache = new NodeCache();

const checkAuthentication = async (req, res, next) => {
    try {
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const key = `middleware.user.${username}`;
        const cachedResponse = cache.get(key);
        if (cachedResponse) {
            console.log(`Cache hit for ${key}`);
            req.user = cachedResponse;
            next();
        } else {
            console.log(`Cache miss for ${key}`);
            const { User } = req.app.get('models')

            const user = await User.findOne({
                attributes: ['id', 'userName', 'password', 'status', 'createdAt'],
                where: {
                    userName: username
                }
            });

            const isValidPassword = Buffer.from(user.password, 'base64').toString('ascii') == password;

            delete user.dataValues.password

            if(!user || user.status === 'INACTIVE' || !isValidPassword)
                return res.status(401).end()

            req.user = user.dataValues;
            cache.set(key, user, config.MIDDLEWARE_CACHE_TTL);
            next();
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).end()
    }
}
module.exports = { checkAuthentication }