class Subtraction {

    executeOperation(value1, value2) {
        if (!value1 && !value2)
            throw new Error('required_field_error');

        return Number(value1) - Number(value2);
    }
}

module.exports = Subtraction;