/**
 * Unit Tests for Calculator Functions
 * Tests all basic arithmetic operations and edge cases
 */

const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator - Addition Tests', () => {
    test('2 + 3 should equal 5 (from image example)', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('should add two positive numbers', () => {
        expect(add(10, 5)).toBe(15);
    });

    test('should add multiple numbers', () => {
        expect(add(1, 2, 3, 4)).toBe(10);
    });

    test('should add negative numbers', () => {
        expect(add(-5, -3)).toBe(-8);
    });

    test('should add positive and negative numbers', () => {
        expect(add(10, -5)).toBe(5);
    });

    test('should handle decimal numbers', () => {
        expect(add(1.5, 2.5)).toBe(4);
    });

    test('should return 0 when no arguments provided', () => {
        expect(add()).toBe(0);
    });

    test('should handle zero', () => {
        expect(add(0, 5)).toBe(5);
    });
});

describe('Calculator - Subtraction Tests', () => {
    test('10 - 4 should equal 6 (from image example)', () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test('should subtract two positive numbers', () => {
        expect(subtract(15, 5)).toBe(10);
    });

    test('should subtract multiple numbers', () => {
        expect(subtract(20, 5, 3)).toBe(12);
    });

    test('should handle negative results', () => {
        expect(subtract(5, 10)).toBe(-5);
    });

    test('should subtract negative numbers', () => {
        expect(subtract(10, -5)).toBe(15);
    });

    test('should handle decimal numbers', () => {
        expect(subtract(5.5, 2.5)).toBe(3);
    });

    test('should return 0 when no arguments provided', () => {
        expect(subtract()).toBe(0);
    });

    test('should handle zero', () => {
        expect(subtract(5, 0)).toBe(5);
    });
});

describe('Calculator - Multiplication Tests', () => {
    test('45 * 2 should equal 90 (from image example)', () => {
        expect(multiply(45, 2)).toBe(90);
    });

    test('should multiply two positive numbers', () => {
        expect(multiply(4, 5)).toBe(20);
    });

    test('should multiply multiple numbers', () => {
        expect(multiply(2, 3, 4)).toBe(24);
    });

    test('should handle negative numbers', () => {
        expect(multiply(-5, 3)).toBe(-15);
    });

    test('should multiply two negative numbers to get positive', () => {
        expect(multiply(-4, -5)).toBe(20);
    });

    test('should handle decimal numbers', () => {
        expect(multiply(2.5, 4)).toBe(10);
    });

    test('should return 1 when no arguments provided', () => {
        expect(multiply()).toBe(1);
    });

    test('should handle zero multiplication', () => {
        expect(multiply(5, 0)).toBe(0);
    });

    test('should handle zero in multiple arguments', () => {
        expect(multiply(5, 10, 0, 2)).toBe(0);
    });
});

describe('Calculator - Division Tests', () => {
    test('20 / 5 should equal 4 (from image example)', () => {
        expect(divide(20, 5)).toBe(4);
    });

    test('should divide two positive numbers', () => {
        expect(divide(20, 4)).toBe(5);
    });

    test('should divide multiple numbers', () => {
        expect(divide(100, 2, 5)).toBe(10);
    });

    test('should handle negative numbers', () => {
        expect(divide(-20, 4)).toBe(-5);
    });

    test('should divide two negative numbers to get positive', () => {
        expect(divide(-20, -4)).toBe(5);
    });

    test('should handle decimal results', () => {
        expect(divide(5, 2)).toBe(2.5);
    });

    test('should handle decimal numbers', () => {
        expect(divide(7.5, 2.5)).toBe(3);
    });

    test('should return 0 when no arguments provided', () => {
        expect(divide()).toBe(0);
    });

    test('should handle division by 1', () => {
        expect(divide(10, 1)).toBe(10);
    });

    test('should throw error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error when zero appears in chain division', () => {
        expect(() => divide(100, 10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should allow zero as first number (0 divided by any number)', () => {
        expect(divide(0, 5)).toBe(0);
    });
});

describe('Calculator - Modulo Tests', () => {
    test('5 % 2 should equal 1 (from image example)', () => {
        expect(modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo of two positive numbers', () => {
        expect(modulo(10, 3)).toBe(1);
    });

    test('should return 0 when number is evenly divisible', () => {
        expect(modulo(10, 5)).toBe(0);
    });

    test('should handle modulo with larger dividend', () => {
        expect(modulo(17, 5)).toBe(2);
    });

    test('should handle modulo with negative dividend', () => {
        expect(modulo(-10, 3)).toBe(-1);
    });

    test('should handle modulo with negative divisor', () => {
        expect(modulo(10, -3)).toBe(1);
    });

    test('should handle both negative numbers', () => {
        expect(modulo(-10, -3)).toBe(-1);
    });

    test('should handle decimal numbers', () => {
        expect(modulo(5.5, 2)).toBeCloseTo(1.5);
    });

    test('should handle modulo with 1', () => {
        expect(modulo(10, 1)).toBe(0);
    });

    test('should throw error when modulo by zero', () => {
        expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed');
    });

    test('should handle zero as dividend', () => {
        expect(modulo(0, 5)).toBe(0);
    });
});

describe('Calculator - Power Tests', () => {
    test('2 ^ 3 should equal 8 (from image example)', () => {
        expect(power(2, 3)).toBe(8);
    });

    test('should calculate power of positive numbers', () => {
        expect(power(3, 4)).toBe(81);
    });

    test('should handle power of 0', () => {
        expect(power(5, 0)).toBe(1);
    });

    test('should handle power of 1', () => {
        expect(power(5, 1)).toBe(5);
    });

    test('should handle base of 0', () => {
        expect(power(0, 5)).toBe(0);
    });

    test('should handle negative exponent', () => {
        expect(power(2, -2)).toBe(0.25);
    });

    test('should handle negative base with positive exponent', () => {
        expect(power(-2, 3)).toBe(-8);
    });

    test('should handle negative base with even exponent', () => {
        expect(power(-2, 4)).toBe(16);
    });

    test('should handle decimal base', () => {
        expect(power(1.5, 2)).toBe(2.25);
    });

    test('should handle decimal exponent', () => {
        expect(power(4, 0.5)).toBe(2);
    });

    test('should handle large exponents', () => {
        expect(power(2, 10)).toBe(1024);
    });

    test('should handle 1 to any power', () => {
        expect(power(1, 100)).toBe(1);
    });
});

describe('Calculator - Square Root Tests', () => {
    test('√16 should equal 4 (from image example)', () => {
        expect(squareRoot(16)).toBe(4);
    });

    test('should calculate square root of perfect square', () => {
        expect(squareRoot(25)).toBe(5);
    });

    test('should calculate square root of 0', () => {
        expect(squareRoot(0)).toBe(0);
    });

    test('should calculate square root of 1', () => {
        expect(squareRoot(1)).toBe(1);
    });

    test('should calculate square root of non-perfect square', () => {
        expect(squareRoot(2)).toBeCloseTo(1.414, 3);
    });

    test('should handle decimal numbers', () => {
        expect(squareRoot(6.25)).toBe(2.5);
    });

    test('should handle large numbers', () => {
        expect(squareRoot(10000)).toBe(100);
    });

    test('should handle very small numbers', () => {
        expect(squareRoot(0.25)).toBe(0.5);
    });

    test('should throw error for negative numbers', () => {
        expect(() => squareRoot(-9)).toThrow('Square root of negative numbers is not supported');
    });

    test('should handle negative zero (edge case)', () => {
        expect(squareRoot(-0)).toBe(-0);
    });
});

describe('Calculator - Edge Cases and Special Scenarios', () => {
    test('should handle very large numbers in addition', () => {
        expect(add(1000000, 2000000)).toBe(3000000);
    });

    test('should handle very small decimal numbers', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should handle mixed operations result (addition)', () => {
        const result1 = add(2, 3);
        const result2 = multiply(result1, 2);
        expect(result2).toBe(10);
    });

    test('should handle negative zero', () => {
        expect(add(-0, 0)).toBe(0);
    });

    test('should handle multiplication by 1', () => {
        expect(multiply(42, 1)).toBe(42);
    });

    test('should chain new operations together', () => {
        const result1 = power(2, 3); // 8
        const result2 = squareRoot(result1); // √8 ≈ 2.828
        expect(result2).toBeCloseTo(2.828, 3);
    });

    test('should verify modulo and division relationship', () => {
        const dividend = 17;
        const divisor = 5;
        const quotient = Math.floor(dividend / divisor);
        const remainder = modulo(dividend, divisor);
        expect(quotient * divisor + remainder).toBe(dividend);
    });
});
