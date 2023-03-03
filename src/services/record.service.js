const { sequelize } = require('../model')
const { Op } = require("sequelize");
const HttpResponse = require('../classes/HttpResponse');
const paginate = require('../helpers/paginate');

class RecordService {

    async getAllRecordsByUserId (userId, page = 0, limit = 10, searchTerm = '', sortBy = 'ASC') {

        const sortType = sortBy === 'ASC' ? 'ASC' : 'DESC';

        const { User, Record } = sequelize.models;
        const records = await Record.findAll(
            paginate({
                where: {
                    UserId: userId,
                    deleted: false,
                },
                order: [['createdAt', sortType]],
                include: {
                    model: User,
                    require: true,
                    where: {
                        userName: {
                            [Op.like]: `%${searchTerm}%`,
                        }
                    }
                }
            },
            { page, pageSize: limit }
        ));

        return new HttpResponse(200, records);
    }

    async deleteRecordById(recordId) {
        const { Record } = sequelize.models;
        const deleted = await Record.update({ deleted: true }, { where: { id: recordId }});

        if (deleted)
            return new HttpResponse(204);

        return new HttpResponse(404);
    }
}

module.exports = RecordService;
