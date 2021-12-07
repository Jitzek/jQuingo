/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
export default function hasPath<T extends {}>(obj: T, path: string | string[], hasFunc: (object: T, key: string | symbol) => boolean): boolean;
