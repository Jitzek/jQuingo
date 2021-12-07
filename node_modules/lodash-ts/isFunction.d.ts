/**
 * @module lodash-ts/isFunction
 * @example
 * import isFunction from 'lodash-ts/isFunction';
 *
 * isFunction(_);
 * // => true
 *
 * isFunction(/abc/);
 * @see _.isFunction
*/
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
export default function isFunction(value: any): boolean;
