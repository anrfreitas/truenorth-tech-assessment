class SquaredRoot {

    executeOperation(value1) {
        if (!value1)
            throw new Error('required_field_error');

        return Math.sqrt(Number(value1));
    }
}

module.exports = SquaredRoot;