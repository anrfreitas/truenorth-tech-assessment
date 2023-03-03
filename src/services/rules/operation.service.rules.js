const Joi = require('joi');

const executeOperation = Joi.object({
    type: Joi.string().required(),
    value1: Joi.number().optional(),
    value2: Joi.number().optional(),
});

module.exports = {
    executeOperation,
}