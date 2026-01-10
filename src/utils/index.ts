import type { Range } from "./types";
import { validatePositiveInteger } from "./validation";

// Direct Recurrence
export function evenFibonacci(n: number): number {
  // EFn = 4*EFn-1 + EFn-2
  // 0, 2, 8, 34, 144, 610, ...
  if (n <= 0) return 0;
  if (n === 1) return 2;
  return 4 * evenFibonacci(n - 1) + evenFibonacci(n - 2);
}

export function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export const arraySum = (numbers: number[]): number =>
  numbers.reduce((total, nbr) => total + nbr, 0);

export const range = ({ start = 0, stop, step = 1 }: Range): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const factors = (n: number): number[] => {
  validatePositiveInteger({ value: n, functionName: "factors()", minValue: 1 });

  // Special case for 1
  if (n === 1) return [1];

  // Calculate factors
  const lRange = range({ start: 1, stop: Math.floor(Math.sqrt(n)) });
  return Array.from(
    new Set(lRange.filter((i) => n % i === 0).flatMap((i) => [i, n / i]))
  ).sort((a, b) => a - b);
};

export const primeFactors = (n: number): number[] => {
  validatePositiveInteger({
    value: n,
    functionName: "primeFactors()",
    minValue: 2,
  });

  const result: number[] = [];
  let divisor = 2;
  let remaining = n;

  // Optimization: handle 2 separately
  while (remaining % 2 === 0) {
    result.push(2);
    remaining /= 2;
  }

  // Only check odd divisors from 3 onward
  divisor = 3;
  while (remaining > 1) {
    if (remaining % divisor === 0) {
      result.push(divisor);
      remaining /= divisor;
    } else {
      divisor += 2; // Skip even numbers
    }

    // Optimization: stop at sqrt(remaining)
    if (divisor * divisor > remaining && remaining > 1) {
      result.push(remaining);
      break;
    }
  }

  return Array.from(new Set(result)).sort((a, b) => a - b);
};
