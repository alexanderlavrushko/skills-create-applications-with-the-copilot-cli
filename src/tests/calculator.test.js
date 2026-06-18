"use strict";

const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  normalizeOperation,
} = require("../calculator");

describe("calculator operations", () => {
  test("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-4, 10)).toBe(6);
  });

  test("subtracts numbers", () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(3, 7)).toBe(-4);
  });

  test("multiplies numbers", () => {
    expect(multiply(45, 2)).toBe(90);
    expect(multiply(-3, 4)).toBe(-12);
  });

  test("divides numbers", () => {
    expect(divide(20, 5)).toBe(4);
    expect(divide(7.5, 2.5)).toBe(3);
  });

  test("throws when dividing by zero", () => {
    expect(() => divide(9, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("image example calculations", () => {
  test("matches the sample operations from the image", () => {
    expect(calculate("+", 2, 3)).toBe(5);
    expect(calculate("-", 10, 4)).toBe(6);
    expect(calculate("*", 45, 2)).toBe(90);
    expect(calculate("/", 20, 5)).toBe(4);
  });
});

describe("operation handling", () => {
  test("normalizes supported operation aliases", () => {
    expect(normalizeOperation("add")).toBe("add");
    expect(normalizeOperation("addition")).toBe("add");
    expect(normalizeOperation("-")).toBe("subtract");
    expect(normalizeOperation("x")).toBe("multiply");
    expect(normalizeOperation("DIVISION")).toBe("divide");
  });

  test("returns null for unsupported operations", () => {
    expect(normalizeOperation("%")).toBeNull();
    expect(normalizeOperation("")).toBeNull();
    expect(normalizeOperation(undefined)).toBeNull();
  });

  test("calculates with named operations and symbols", () => {
    expect(calculate("add", 8, 2)).toBe(10);
    expect(calculate("subtraction", 8, 2)).toBe(6);
    expect(calculate("x", 8, 2)).toBe(16);
    expect(calculate("/", 8, 2)).toBe(4);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("%", 8, 2)).toThrow("Unsupported operation: %");
  });

  test("propagates division by zero from calculate", () => {
    expect(() => calculate("/", 8, 0)).toThrow("Division by zero is not allowed.");
  });
});
