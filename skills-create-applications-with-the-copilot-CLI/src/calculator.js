#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers
 * - Multiplication (×): Multiply numbers
 * - Division (÷): Divide numbers with error handling for division by zero
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

// Main CLI function
function calculator() {
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
        console.log('Usage: node calculator.js <operation> <number1> <number2> [number3...]');
        console.log('Operations: add, subtract, multiply, divide');
        console.log('Example: node calculator.js add 5 3');
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
            default:
                console.error(`Error: Unknown operation '${operation}'`);
                console.log('Supported operations: add, subtract, multiply, divide');
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
    divide
};
