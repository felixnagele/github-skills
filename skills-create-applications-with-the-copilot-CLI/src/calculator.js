#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers
 * - Multiplication (×): Multiply numbers
 * - Division (÷): Divide numbers with error handling for division by zero
 * - Modulo (%): Returns the remainder of division
 * - Power (^): Raises base to the exponent
 * - Square Root (√): Returns the square root of a number
 * 
 * Usage: node calculator.js <operation> <number1> <number2> [number3...]
 * Example: node calculator.js add 5 3
 *          node calculator.js multiply 4 7
 */

// Addition: Add two or more numbers
function add(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Subtraction: Subtract numbers from the first number
function subtract(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((result, num, index) => {
        return index === 0 ? num : result - num;
    });
}

// Multiplication: Multiply numbers together
function multiply(...numbers) {
    return numbers.reduce((product, num) => product * num, 1);
}

// Division: Divide numbers with error handling for division by zero
function divide(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((result, num, index) => {
        if (index !== 0 && num === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return index === 0 ? num : result / num;
    });
}

// Modulo: Returns the remainder of a divided by b
function modulo(a, b) {
    if (b === 0) {
        throw new Error('Modulo by zero is not allowed');
    }
    return a % b;
}

// Power: Returns base raised to the exponent
function power(base, exponent) {
    return Math.pow(base, exponent);
}

// Square Root: Returns the square root of n with error handling for negative numbers
function squareRoot(n) {
    if (n < 0) {
        throw new Error('Square root of negative numbers is not supported');
    }
    return Math.sqrt(n);
}

// Main CLI function
function calculator() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node calculator.js <operation> <number1> <number2> [number3...]');
        console.log('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
        console.log('Example: node calculator.js add 5 3');
        console.log('         node calculator.js sqrt 16');
        process.exit(1);
    }
    
    const operation = args[0].toLowerCase();
    const numbers = args.slice(1).map(arg => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            console.error(`Error: '${arg}' is not a valid number`);
            process.exit(1);
        }
        return num;
    });
    
    try {
        let result;
        
        switch (operation) {
            case 'add':
            case '+':
                result = add(...numbers);
                break;
            case 'subtract':
            case '-':
                result = subtract(...numbers);
                break;
            case 'multiply':
            case '*':
            case 'x':
            case '×':
                result = multiply(...numbers);
                break;
            case 'divide':
            case '/':
            case '÷':
                result = divide(...numbers);
                break;
            case 'modulo':
            case 'mod':
            case '%':
                if (numbers.length !== 2) {
                    console.error('Error: Modulo requires exactly 2 numbers');
                    process.exit(1);
                }
                result = modulo(numbers[0], numbers[1]);
                break;
            case 'power':
            case 'pow':
            case '^':
                if (numbers.length !== 2) {
                    console.error('Error: Power requires exactly 2 numbers (base and exponent)');
                    process.exit(1);
                }
                result = power(numbers[0], numbers[1]);
                break;
            case 'sqrt':
            case 'squareroot':
            case '√':
                if (numbers.length !== 1) {
                    console.error('Error: Square root requires exactly 1 number');
                    process.exit(1);
                }
                result = squareRoot(numbers[0]);
                break;
            default:
                console.error(`Error: Unknown operation '${operation}'`);
                console.log('Supported operations: add, subtract, multiply, divide, modulo, power, sqrt');
                process.exit(1);
        }
        
        console.log(`Result: ${result}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Run the calculator if this file is executed directly
if (require.main === module) {
    calculator();
}

// Export functions for testing
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    modulo,
    power,
    squareRoot
};
