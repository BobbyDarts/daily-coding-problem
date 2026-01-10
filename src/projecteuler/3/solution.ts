import { primeFactors } from "../../utils";

export const largestPrimeFactor = (n: number): number =>
  primeFactors(n).at(-1)!;
