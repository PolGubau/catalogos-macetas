/**
 * useRangeValidation Hook
 * 
 * Provides validation logic for min/max range values.
 * Follows Single Responsibility Principle - only handles range validation logic.
 * Follows Dependency Inversion Principle - returns pure functions that can be used anywhere.
 */

interface RangeValidationResult {
  min: number | undefined;
  max: number | undefined;
}

/**
 * Validates and adjusts min/max range values to ensure min <= max
 */
export function useRangeValidation() {
  const validateMinValue = (
    newMin: number | null,
    currentMax: number | undefined
  ): RangeValidationResult => {
    const min = newMin ?? undefined;
    let max = currentMax;

    // If min is set and max is less than min, adjust max to equal min
    if (newMin !== null && (currentMax === undefined || currentMax < newMin)) {
      max = newMin;
    }

    return { min, max };
  };

  const validateMaxValue = (
    newMax: number | null,
    currentMin: number | undefined
  ): RangeValidationResult => {
    const max = newMax ?? undefined;
    let min = currentMin;

    // If max is set and min is greater than max, adjust min to equal max
    if (newMax !== null && currentMin !== undefined && currentMin > newMax) {
      min = newMax;
    }

    return { min, max };
  };

  return {
    validateMinValue,
    validateMaxValue,
  };
}

