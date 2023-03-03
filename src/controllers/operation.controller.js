const OperationService = require('../services/operation.service');
const HttpResponse = require('../classes/HttpResponse');

class UserController {

    static async getAll() {
        try {
            return new OperationService().getAll();
        } catch (error) {
            return new HttpResponse(500, 'Internal Server Error', error);
        }
    }

    static async executeOperation(userId, type, value1, value2) {
        try {
            return new OperationService().executeOperation(userId, type, value1, value2);
        } catch (error) {
            return new HttpResponse(500, 'Internal Server Error', error);
        }
    }
}

module.exports = UserController;
