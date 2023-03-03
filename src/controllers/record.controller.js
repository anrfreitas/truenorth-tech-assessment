const RecordService = require('../services/record.service');
const HttpResponse = require('../classes/HttpResponse');

class RecordController {

    static async getAllRecordsByUserId(userId, page, limit, searchTerm, sortBy) {
        try {
            return new RecordService().getAllRecordsByUserId(userId, page, limit, searchTerm, sortBy);
        } catch (error) {
            return new HttpResponse(500, 'Internal Server Error', error);
        }
    }

    static async deleteRecordById(recordId) {
        try {
            return new RecordService().deleteRecordById(recordId);
        } catch (error) {
            return new HttpResponse(500, 'Internal Server Error', error);
        }
    }
}

module.exports = RecordController;
