type ValidatePositiveIntegerParams = {
  value: number;
  functionName: string;
  minValue?: number;
};

/**
 * Validates that a value is a positive integer
 * @param value - The value to validate
 * @param functionName - Name of the calling function for error messages
 * @param minValue - Minimum allowed value (default: 1)
 * @throws {TypeError} If value is not a valid number or not an integer
 * @throws {RangeError} If value is Infinity or below minValue
 */
// With optional params, I like to use a single object parameter for clarity
export function validatePositiveInteger({
  value,
  functionName,
  minValue = 1,
}: ValidatePositiveIntegerParams): void {
  // Type validation
  if (typeof value !== "number" || isNaN(value)) {
    throw new TypeError(`${functionName} requires a valid number`);
  }

  // Infinity check
  if (!isFinite(value)) {
    throw new RangeError(`${functionName} does not accept Infinity`);
  }

  // Integer check
  if (!Number.isInteger(value)) {
    throw new TypeError(
      `${functionName} requires an integer, received ${value}`
    );
  }

  // Range check
  if (value < minValue) {
    throw new RangeError(
      `${functionName} requires an integer >= ${minValue}, received ${value}`
    );
  }
}
