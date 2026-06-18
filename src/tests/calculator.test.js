"use strict";

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
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

  test("calculates modulo", () => {
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(9, 2)).toBe(1);
  });

  test("throws when taking modulo by zero", () => {
    expect(() => modulo(9, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("calculates power", () => {
    expect(power(2, 4)).toBe(16);
    expect(power(9, 0.5)).toBe(3);
  });

  test("calculates square root", () => {
    expect(squareRoot(25)).toBe(5);
    expect(squareRoot(0)).toBe(0);
  });

  test("throws for square root of negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow("Square root of a negative number is not allowed.");
  });
});

describe("image example calculations", () => {
  test("matches the sample operations from the image", () => {
    expect(calculate("+", 2, 3)).toBe(5);
    expect(calculate("-", 10, 4)).toBe(6);
    expect(calculate("*", 45, 2)).toBe(90);
    expect(calculate("/", 20, 5)).toBe(4);
    expect(calculate("%", 10, 3)).toBe(1);
    expect(calculate("^", 2, 4)).toBe(16);
    expect(calculate("sqrt", 25)).toBe(5);
  });
});

describe("operation handling", () => {
  test("normalizes supported operation aliases", () => {
    expect(normalizeOperation("add")).toBe("add");
    expect(normalizeOperation("addition")).toBe("add");
    expect(normalizeOperation("-")).toBe("subtract");
    expect(normalizeOperation("x")).toBe("multiply");
    expect(normalizeOperation("DIVISION")).toBe("divide");
    expect(normalizeOperation("%")).toBe("modulo");
    expect(normalizeOperation("POWER")).toBe("power");
    expect(normalizeOperation("squareRoot")).toBe("squareRoot");
  });

  test("returns null for unsupported operations", () => {
    expect(normalizeOperation("//")).toBeNull();
    expect(normalizeOperation("")).toBeNull();
    expect(normalizeOperation(undefined)).toBeNull();
  });

  test("calculates with named operations and symbols", () => {
    expect(calculate("add", 8, 2)).toBe(10);
    expect(calculate("subtraction", 8, 2)).toBe(6);
    expect(calculate("x", 8, 2)).toBe(16);
    expect(calculate("/", 8, 2)).toBe(4);
    expect(calculate("modulo", 8, 3)).toBe(2);
    expect(calculate("**", 2, 3)).toBe(8);
    expect(calculate("squareroot", 9)).toBe(3);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("//", 8, 2)).toThrow("Unsupported operation: //");
  });

  test("propagates division by zero from calculate", () => {
    expect(() => calculate("/", 8, 0)).toThrow("Division by zero is not allowed.");
  });

  test("propagates modulo by zero from calculate", () => {
    expect(() => calculate("%", 8, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("propagates square root errors from calculate", () => {
    expect(() => calculate("sqrt", -4)).toThrow("Square root of a negative number is not allowed.");
  });
});
