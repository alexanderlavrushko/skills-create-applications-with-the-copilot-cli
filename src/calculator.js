#!/usr/bin/env node

"use strict";

/**
 * Supported calculator operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
 * - modulo (%)
 * - exponentiation (^)
 * - square root (sqrt)
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

const OPERATION_ALIASES = {
  "+": "add",
  add: "add",
  addition: "add",
  "-": "subtract",
  subtract: "subtract",
  subtraction: "subtract",
  "*": "multiply",
  x: "multiply",
  multiply: "multiply",
  multiplication: "multiply",
  "/": "divide",
  divide: "divide",
  division: "divide",
  "%": "modulo",
  modulo: "modulo",
  remainder: "modulo",
  "^": "power",
  "**": "power",
  power: "power",
  exponentiation: "power",
  sqrt: "squareRoot",
  squareroot: "squareRoot",
  "square-root": "squareRoot",
};

const OPERATION_HANDLERS = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};

const UNARY_OPERATIONS = new Set(["squareRoot"]);

function normalizeOperation(operation) {
  if (!operation) {
    return null;
  }

  return OPERATION_ALIASES[String(operation).toLowerCase()] ?? null;
}

function calculate(operation, left, right) {
  const normalizedOperation = normalizeOperation(operation);

  if (!normalizedOperation) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  if (UNARY_OPERATIONS.has(normalizedOperation)) {
    return OPERATION_HANDLERS[normalizedOperation](left);
  }

  return OPERATION_HANDLERS[normalizedOperation](left, right);
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }

  return parsedValue;
}

function parseCliArguments(argv) {
  if (argv.length === 2) {
    const [first, second] = argv;
    const firstOperation = normalizeOperation(first);
    const secondOperation = normalizeOperation(second);

    if (firstOperation && UNARY_OPERATIONS.has(firstOperation)) {
      return {
        operation: first,
        left: parseNumber(second, "operand"),
      };
    }

    if (secondOperation && UNARY_OPERATIONS.has(secondOperation)) {
      return {
        operation: second,
        left: parseNumber(first, "operand"),
      };
    }

    throw new Error("Expected a supported unary operation and one operand.");
  }

  if (argv.length !== 3) {
    throw new Error("Expected either two or three arguments.");
  }

  const [first, second, third] = argv;

  if (normalizeOperation(first)) {
    return {
      operation: first,
      left: parseNumber(second, "left operand"),
      right: parseNumber(third, "right operand"),
    };
  }

  if (normalizeOperation(second)) {
    return {
      operation: second,
      left: parseNumber(first, "left operand"),
      right: parseNumber(third, "right operand"),
    };
  }

  throw new Error("No supported operation was provided.");
}

function getUsageText() {
  return [
    "Usage:",
    "  node src/calculator.js <operation> <left> <right>",
    "  node src/calculator.js <left> <operation> <right>",
    "",
    "Examples:",
    "  node src/calculator.js add 7 3",
    "  node src/calculator.js 7 + 3",
    "  node src/calculator.js 8 x 2",
    "  node src/calculator.js 10 % 3",
    "  node src/calculator.js 2 ^ 5",
    "  node src/calculator.js sqrt 9",
    "",
    "Supported operations: add, subtract, multiply, divide, modulo, power, squareRoot, +, -, *, x, /, %, ^, **, sqrt",
  ].join("\n");
}

function runCli() {
  try {
    const { operation, left, right } = parseCliArguments(process.argv.slice(2));
    const result = calculate(operation, left, right);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    console.error("");
    console.error(getUsageText());
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  normalizeOperation,
};
