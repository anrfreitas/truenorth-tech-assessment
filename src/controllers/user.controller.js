const UserService = require('../services/user.service');
const HttpResponse = require('../classes/HttpResponse');

class UserController {

    static async getUserById(userId) {
        try {
            return new UserService().getUserById(userId);
        } catch (error) {
            return new HttpResponse(500, 'Internal Server Error', error);
        }
    }
}

module.exports = UserController;
