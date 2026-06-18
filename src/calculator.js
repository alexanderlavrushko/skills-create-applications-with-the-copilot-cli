#!/usr/bin/env node

"use strict";

/**
 * Supported calculator operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
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
};

const OPERATION_HANDLERS = {
  add,
  subtract,
  multiply,
  divide,
};

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
  if (argv.length !== 3) {
    throw new Error("Expected exactly three arguments.");
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
    "",
    "Supported operations: add, subtract, multiply, divide, +, -, *, x, /",
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
  calculate,
  normalizeOperation,
};
