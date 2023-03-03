const Addition = require('./operators/Addition');
const Subtraction = require('./operators/Subtraction');
const Multiplication = require('./operators/Multiplication');
const Division = require('./operators/Division');
const SquareRoot = require('./operators/SquaredRoot');
const RandomString = require('./operators/RandomString');

class ArithmeticCalculator {

    static operator = {
        ADDITION: () => new Addition,
        SUBTRACTION: () => new Subtraction,
        MULTIPLICATION: () => new Multiplication,
        DIVISION: () => new Division,
        SQUARE_ROOT: () => new SquareRoot,
        RANDOM_STRING: () => new RandomString,
    }

    static executeOperation(type, value1, value2) {
        const operator = this.operator[type] && this.operator[type]();

        if (!operator)
            throw new Error('operator_error');

        return String(operator.executeOperation(value1, value2));

    }
}

module.exports = ArithmeticCalculator;