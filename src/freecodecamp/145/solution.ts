// Free Code Camp Daily Coding Challenge (01/02/2026)
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CACHE_FILE = join(__dirname, "fib-cache.json");
const FLUSH_THRESHOLD = 100; // Flush every 100 new calculations

function loadCache(): Map<number, number> {
  if (!existsSync(CACHE_FILE)) {
    return new Map();
  }

  try {
    const data = JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    return new Map(
      Object.entries(data).map(([k, v]) => [parseInt(k), v as number])
    );
  } catch (error) {
    console.error("Error loading cache:", error);
    return new Map();
  }
}

function saveCache(cache: Map<number, number>): void {
  try {
    const obj = Object.fromEntries(cache);
    writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2));
  } catch (error) {
    console.error("Error saving cache:", error);
  }
}

// Load cache on module initialization
const fibCache = loadCache();
let newCalculations = 0;

export function nthFibonacci(n: number): number {
  // Check cache first
  if (fibCache.has(n)) {
    return fibCache.get(n)!;
  }

  // Base cases
  if (n <= 1) {
    return n;
  }

  // Calculate recursively
  const result = nthFibonacci(n - 1) + nthFibonacci(n - 2);

  // Store in memory cache
  fibCache.set(n, result);
  newCalculations++;

  // Flush to disk if we've hit the threshold
  if (newCalculations >= FLUSH_THRESHOLD) {
    saveCache(fibCache);
    newCalculations = 0;
  }

  return result;
}

// Call this when you're done to ensure everything is saved
export function flushCache(): void {
  if (newCalculations > 0) {
    saveCache(fibCache);
    newCalculations = 0;
  }
}

// Optional: Clear cache function for testing
export function clearCache(): void {
  fibCache.clear();
  newCalculations = 0;
  if (existsSync(CACHE_FILE)) {
    writeFileSync(CACHE_FILE, "{}");
  }
}
