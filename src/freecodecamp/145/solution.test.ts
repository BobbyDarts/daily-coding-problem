import { nthFibonacci, flushCache, clearCache } from "./solution";

describe("Problem 145: Fibonacci with Caching", () => {
  beforeEach(() => {
    // Clear cache before each test for isolation
    clearCache();
  });

  afterAll(() => {
    // Clean up cache file after all tests
    clearCache();
  });

  test("should return correct fibonacci numbers", () => {
    expect(nthFibonacci(0)).toBe(0);
    expect(nthFibonacci(1)).toBe(1);
    expect(nthFibonacci(2)).toBe(1);
    expect(nthFibonacci(3)).toBe(2);
    expect(nthFibonacci(4)).toBe(3);
    expect(nthFibonacci(5)).toBe(5);
    expect(nthFibonacci(6)).toBe(8);
    expect(nthFibonacci(7)).toBe(13);
    expect(nthFibonacci(8)).toBe(21);
    expect(nthFibonacci(9)).toBe(34);
    expect(nthFibonacci(10)).toBe(55);
  });

  test("should handle larger fibonacci numbers", () => {
    expect(nthFibonacci(20)).toBe(6765);
    expect(nthFibonacci(30)).toBe(832040);
  });

  test("should cache and return correct results", () => {
    const result1 = nthFibonacci(35);
    const result2 = nthFibonacci(35); // Uses cache

    expect(result1).toBe(9227465);
    expect(result2).toBe(9227465);
    expect(result1).toBe(result2);
  });

  test("should reuse cached values from previous calculation", () => {
    nthFibonacci(10); // Calculate nthFibonacci(0) through nthFibonacci(10)

    // This should be instant since all values are cached
    const start = Date.now();
    const result = nthFibonacci(8); // Already calculated when computing nthFibonacci(10)
    const time = Date.now() - start;

    expect(result).toBe(21);
    expect(time).toBeLessThan(5); // Should be nearly instant
  });

  test("should build cache incrementally", () => {
    nthFibonacci(5); // Caches 0-5
    nthFibonacci(10); // Reuses 0-5, adds 6-10
    nthFibonacci(15); // Reuses 0-10, adds 11-15

    expect(nthFibonacci(12)).toBe(144); // Should be cached from nthFibonacci(15)
  });

  test("should persist cache to disk after threshold", () => {
    // Calculate enough to trigger flush (>100 calculations)
    nthFibonacci(50);
    flushCache(); // Ensure everything is written

    // Clear in-memory cache to force reload from disk
    clearCache();

    // Should load from disk
    const result = nthFibonacci(50);
    expect(result).toBe(12586269025);
  });

  test("should handle edge case of nthFibonacci(0)", () => {
    expect(nthFibonacci(0)).toBe(0);
  });

  test("should handle edge case of nthFibonacci(1)", () => {
    expect(nthFibonacci(1)).toBe(1);
  });

  test("should flush cache manually", () => {
    nthFibonacci(5);

    // Manual flush
    flushCache();

    // Should be able to call flush multiple times safely
    flushCache();
    flushCache();

    expect(nthFibonacci(5)).toBe(5);
  });

  test("should handle large fibonacci numbers", () => {
    const result = nthFibonacci(40);
    expect(result).toBe(102334155);
    flushCache();
  });

  test("should maintain accuracy for sequential calls", () => {
    const sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

    for (let i = 0; i < sequence.length; i++) {
      expect(nthFibonacci(i)).toBe(sequence[i]);
    }
  });

  test("should clear cache properly", () => {
    nthFibonacci(20);
    flushCache();

    clearCache();

    // After clear, should still calculate correctly
    expect(nthFibonacci(10)).toBe(55);
  });
});
