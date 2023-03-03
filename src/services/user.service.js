const { sequelize } = require('../model')
const HttpResponse = require('../classes/HttpResponse');

class UserService {

    async getUserById (userId) {
        const { User } = sequelize.models;

        const user = await User.findOne({
            attributes: {
                exclude: ['password'],
            },
            where: {
                id: userId,
            },
        });

        if(!user)
            return new HttpResponse(404);

        return new HttpResponse(200, user);
    }
}

module.exports = UserService;
