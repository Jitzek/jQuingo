/**
 * @module lodash-ts/isString
 * @example
 * import isString from 'lodash-ts/isString';
 *
 * isString('abc');
 * // => true
 *
 * isString(1);
 * // => false
 * @see _.isString
*/
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
export default function isString(value: any): boolean;
