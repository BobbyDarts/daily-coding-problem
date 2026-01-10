import { validatePositiveInteger } from "./validation";

describe("validatePositiveInteger", () => {
  describe("Type validation", () => {
    test("should throw TypeError for NaN", () => {
      expect(() =>
        validatePositiveInteger({ value: NaN, functionName: "testFunc()" })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({ value: NaN, functionName: "testFunc()" })
      ).toThrow("testFunc() requires a valid number");
    });

    test("should throw TypeError for non-numbers", () => {
      expect(() =>
        validatePositiveInteger({
          value: "12" as any,
          functionName: "testFunc()",
        })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({
          value: null as any,
          functionName: "testFunc()",
        })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({
          value: undefined as any,
          functionName: "testFunc()",
        })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({
          value: {} as any,
          functionName: "testFunc()",
        })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({
          value: [] as any,
          functionName: "testFunc()",
        })
      ).toThrow(TypeError);
    });
  });

  describe("Infinity validation", () => {
    test("should throw RangeError for Infinity", () => {
      expect(() =>
        validatePositiveInteger({ value: Infinity, functionName: "testFunc()" })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({ value: Infinity, functionName: "testFunc()" })
      ).toThrow("testFunc() does not accept Infinity");
    });

    test("should throw RangeError for negative Infinity", () => {
      expect(() =>
        validatePositiveInteger({
          value: -Infinity,
          functionName: "testFunc()",
        })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({
          value: -Infinity,
          functionName: "testFunc()",
        })
      ).toThrow("testFunc() does not accept Infinity");
    });
  });

  describe("Integer validation", () => {
    test("should throw TypeError for non-integers", () => {
      expect(() =>
        validatePositiveInteger({ value: 3.14, functionName: "testFunc()" })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({ value: 3.14, functionName: "testFunc()" })
      ).toThrow("testFunc() requires an integer, received 3.14");
    });

    test("should throw TypeError for decimals", () => {
      expect(() =>
        validatePositiveInteger({ value: 12.5, functionName: "testFunc()" })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({ value: 0.1, functionName: "testFunc()" })
      ).toThrow(TypeError);
      expect(() =>
        validatePositiveInteger({ value: 99.999, functionName: "testFunc()" })
      ).toThrow(TypeError);
    });
  });

  describe("Range validation with default minValue (1)", () => {
    test("should throw RangeError for zero", () => {
      expect(() =>
        validatePositiveInteger({ value: 0, functionName: "testFunc()" })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({ value: 0, functionName: "testFunc()" })
      ).toThrow("testFunc() requires an integer >= 1, received 0");
    });

    test("should throw RangeError for negative numbers", () => {
      expect(() =>
        validatePositiveInteger({ value: -1, functionName: "testFunc()" })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({ value: -5, functionName: "testFunc()" })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({ value: -100, functionName: "testFunc()" })
      ).toThrow(RangeError);
    });

    test("should accept positive integers >= 1", () => {
      expect(() =>
        validatePositiveInteger({ value: 1, functionName: "testFunc()" })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({ value: 2, functionName: "testFunc()" })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({ value: 100, functionName: "testFunc()" })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({ value: 999999, functionName: "testFunc()" })
      ).not.toThrow();
    });
  });

  describe("Range validation with custom minValue", () => {
    test("should throw RangeError for values below custom minValue", () => {
      expect(() =>
        validatePositiveInteger({
          value: 1,
          functionName: "testFunc()",
          minValue: 2,
        })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({
          value: 1,
          functionName: "testFunc()",
          minValue: 2,
        })
      ).toThrow("testFunc() requires an integer >= 2, received 1");

      expect(() =>
        validatePositiveInteger({
          value: 5,
          functionName: "testFunc()",
          minValue: 10,
        })
      ).toThrow(RangeError);
      expect(() =>
        validatePositiveInteger({
          value: 5,
          functionName: "testFunc()",
          minValue: 10,
        })
      ).toThrow("testFunc() requires an integer >= 10, received 5");
    });

    test("should accept values >= custom minValue", () => {
      expect(() =>
        validatePositiveInteger({
          value: 2,
          functionName: "testFunc()",
          minValue: 2,
        })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({
          value: 3,
          functionName: "testFunc()",
          minValue: 2,
        })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({
          value: 10,
          functionName: "testFunc()",
          minValue: 10,
        })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({
          value: 100,
          functionName: "testFunc()",
          minValue: 10,
        })
      ).not.toThrow();
    });

    test("should accept zero when minValue is 0", () => {
      expect(() =>
        validatePositiveInteger({
          value: 0,
          functionName: "testFunc()",
          minValue: 0,
        })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({
          value: 1,
          functionName: "testFunc()",
          minValue: 0,
        })
      ).not.toThrow();
    });

    test("should handle negative minValue", () => {
      expect(() =>
        validatePositiveInteger({
          value: -5,
          functionName: "testFunc()",
          minValue: -10,
        })
      ).not.toThrow();
      expect(() =>
        validatePositiveInteger({
          value: -11,
          functionName: "testFunc()",
          minValue: -10,
        })
      ).toThrow(RangeError);
    });
  });

  describe("Function name in error messages", () => {
    test("should include function name in TypeError", () => {
      expect(() =>
        validatePositiveInteger({ value: 3.5, functionName: "myFunc()" })
      ).toThrow("myFunc() requires an integer");
      expect(() =>
        validatePositiveInteger({ value: 3.5, functionName: "anotherFunc()" })
      ).toThrow("anotherFunc() requires an integer");
    });

    test("should include function name in RangeError", () => {
      expect(() =>
        validatePositiveInteger({ value: -1, functionName: "myFunc()" })
      ).toThrow("myFunc() requires an integer >= 1");
      expect(() =>
        validatePositiveInteger({
          value: -1,
          functionName: "anotherFunc()",
          minValue: 5,
        })
      ).toThrow("anotherFunc() requires an integer >= 5");
    });
  });

  describe("Edge cases", () => {
    test("should accept Number.MAX_SAFE_INTEGER", () => {
      expect(() =>
        validatePositiveInteger({
          value: Number.MAX_SAFE_INTEGER,
          functionName: "testFunc()",
        })
      ).not.toThrow();
    });

    test("should throw for Number.MIN_SAFE_INTEGER", () => {
      expect(() =>
        validatePositiveInteger({
          value: Number.MIN_SAFE_INTEGER,
          functionName: "testFunc()",
        })
      ).toThrow(RangeError);
    });

    test("should accept 1 as default minimum", () => {
      expect(() =>
        validatePositiveInteger({ value: 1, functionName: "testFunc()" })
      ).not.toThrow();
    });
  });

  describe("Return value", () => {
    test("should return undefined when validation passes", () => {
      const result = validatePositiveInteger({
        value: 5,
        functionName: "testFunc()",
      });
      expect(result).toBeUndefined();
    });
  });
});
