/**
 * Creates a function like `_.round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
export default function createRound(func: (num: number | string) => number): (num: number, precision: any) => number;
