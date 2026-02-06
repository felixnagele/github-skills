/**
 * Unit Tests for Calculator Functions
 * Tests all basic arithmetic operations and edge cases
 */

const { add, subtract, multiply, divide } = require('../calculator');

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
});
