const { sequelize } = require('../model')
const HttpResponse = require('../classes/HttpResponse');
const ObjectValidator = require('../classes/ObjectValidator');
const ArithmeticCalculator = require('../classes/ArithmeticCalculator');
const OperationServiceRules = require('./rules/operation.service.rules');

class OperationService {

    #errorMessages = {
        "required_field_error": "You must setup value fields to proceed with the operation",
        "operator_error": "Invalid operator",
    }

    async getAll () {
        const { Operation } = sequelize.models;
        const operations = await Operation.findAll();
        return new HttpResponse(200, operations);
    }

    async executeOperation (userId, type, value1, value2) {
        const t = await sequelize.transaction();

        const { User, Operation, Record } = sequelize.models;

        const validation = ObjectValidator
            .validate(OperationServiceRules.executeOperation, { type, value1, value2 });

        if (validation.error)
            return new HttpResponse(422, validation);

        const operation = await Operation.findOne({ where: { type } });
        const user = await User.findOne({ where: { id: userId } });

        if (!operation)
            return new HttpResponse(404);

        if (!user)
            return new HttpResponse(404);

        if (user.balance < operation.cost)
            return new HttpResponse(406, { error: 'Insuficient balance' });

        try {
            const t1 = await User.update(
                {
                    balance: user.balance - operation.cost
                },
                {
                    where: {
                        id: userId,
                        version: user.version
                    },
                    lock: true,
                    transaction: t,
                }
            );

            const t2 = await Record.create({
                UserId: userId,
                OperationId: operation.id,
                amount: operation.cost,
                userBalance: user.balance,
                operationResponse: ArithmeticCalculator.executeOperation(type, value1, value2),
            },
            {
                lock: true,
                transaction: t,
            });

            if (t1 && t2) {
                await t.commit();
                return new HttpResponse(200, t2);
            }
            else {
                await t.rollback();
                throw new Error('Transaction failed');
            }

        } catch (error) {
            await t.rollback();
            return new HttpResponse(422, {
                error: "We can't process your request right now. Try again.",
                reason: this.#errorMessages[error?.message]
            }, error);
        }
    }
}

module.exports = OperationService;
