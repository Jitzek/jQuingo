/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arr The arrays to be inspected.
 * @param {Array} arrays The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
export default function intersection<T>(arr: T[], ...arrays: T[][]): T[];
