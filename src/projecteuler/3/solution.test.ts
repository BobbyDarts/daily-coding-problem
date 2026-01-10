import { largestPrimeFactor } from "./solution";

describe("Project Euler #3: Largest Prime Factor", () => {
  test("should return largest prime factor for small numbers", () => {
    expect(largestPrimeFactor(12)).toBe(3); // 2^2 × 3
    expect(largestPrimeFactor(20)).toBe(5); // 2^2 × 5
    expect(largestPrimeFactor(28)).toBe(7); // 2^2 × 7
  });

  test("should return the number itself for primes", () => {
    expect(largestPrimeFactor(2)).toBe(2);
    expect(largestPrimeFactor(3)).toBe(3);
    expect(largestPrimeFactor(7)).toBe(7);
    expect(largestPrimeFactor(11)).toBe(11);
    expect(largestPrimeFactor(13)).toBe(13);
  });

  test("should handle powers of 2", () => {
    expect(largestPrimeFactor(4)).toBe(2); // 2^2
    expect(largestPrimeFactor(8)).toBe(2); // 2^3
    expect(largestPrimeFactor(16)).toBe(2); // 2^4
    expect(largestPrimeFactor(32)).toBe(2); // 2^5
  });

  test("should handle powers of other primes", () => {
    expect(largestPrimeFactor(9)).toBe(3); // 3^2
    expect(largestPrimeFactor(27)).toBe(3); // 3^3
    expect(largestPrimeFactor(25)).toBe(5); // 5^2
    expect(largestPrimeFactor(125)).toBe(5); // 5^3
  });

  test("should handle composite numbers", () => {
    expect(largestPrimeFactor(30)).toBe(5); // 2 × 3 × 5
    expect(largestPrimeFactor(42)).toBe(7); // 2 × 3 × 7
    expect(largestPrimeFactor(60)).toBe(5); // 2^2 × 3 × 5
    expect(largestPrimeFactor(84)).toBe(7); // 2^2 × 3 × 7
  });

  test("should handle perfect squares", () => {
    expect(largestPrimeFactor(36)).toBe(3); // 2^2 × 3^2
    expect(largestPrimeFactor(100)).toBe(5); // 2^2 × 5^2
    expect(largestPrimeFactor(144)).toBe(3); // 2^4 × 3^2
  });

  test("should handle numbers with large prime factors", () => {
    expect(largestPrimeFactor(14)).toBe(7); // 2 × 7
    expect(largestPrimeFactor(22)).toBe(11); // 2 × 11
    expect(largestPrimeFactor(26)).toBe(13); // 2 × 13
  });

  test("should handle Project Euler example", () => {
    // The prime factors of 13195 are 5, 7, 13 and 29
    expect(largestPrimeFactor(13195)).toBe(29);
  });

  test("should handle larger numbers", () => {
    expect(largestPrimeFactor(210)).toBe(7); // 2 × 3 × 5 × 7
    expect(largestPrimeFactor(462)).toBe(11); // 2 × 3 × 7 × 11
  });

  test("should handle consecutive primes", () => {
    expect(largestPrimeFactor(6)).toBe(3); // 2 × 3
    expect(largestPrimeFactor(15)).toBe(5); // 3 × 5
    expect(largestPrimeFactor(35)).toBe(7); // 5 × 7
  });

  test("should solve Project Euler #3", () => {
    // What is the largest prime factor of the number 600851475143?
    expect(largestPrimeFactor(600851475143)).toBe(6857);
  });
});
