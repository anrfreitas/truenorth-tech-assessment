const ArithmeticCalculator = require('../ArithmeticCalculator');

describe('Test ArithmeticCalculator', () => {
    test('Testing ADDITION operation', () => {
        expect(ArithmeticCalculator.executeOperation('ADDITION', 1, 1)).toBe("2");
    });

    test('Testing SUBTRACTION operation', () => {
        expect(ArithmeticCalculator.executeOperation('SUBTRACTION', 1, 1)).toBe("0");
    });

    test('Testing MULTIPLICATION operation', () => {
        expect(ArithmeticCalculator.executeOperation('MULTIPLICATION', 5, 5)).toBe("25");
    });

    test('Testing DIVISION operation', () => {
        expect(ArithmeticCalculator.executeOperation('DIVISION', 9, 3)).toBe("3");
    });

    test('Testing SQUARE_ROOT operation', () => {
        expect(ArithmeticCalculator.executeOperation('SQUARE_ROOT', 9)).toBe("3");
    });

    test('Testing RANDOM_STRING operation', () => {
        expect(typeof ArithmeticCalculator.executeOperation('RANDOM_STRING')).toBe('string');
    });

    test('Testing SQUARE_ROOT operation', () => {
        try {
            ArithmeticCalculator.executeOperation('SQUARE_ROOT');
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe('required_field_error');
        }
    });

    test('Testing UNKOWN operation', () => {
        try {
            ArithmeticCalculator.executeOperation('UNKOWN');
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe('operator_error');
        }
    });

    // @TODO - edge cases, catch errors, etc
});
