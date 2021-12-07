"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:32
* @CopyRight			飞道科技
*/
const sum_1 = require("./sum");
/** Used as references for various `Number` constants. */
const NAN = 0 / 0;
/**
 * Computes the mean of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * _.mean([4, 2, 8, 6]);
 * // => 5
 */
function mean(array) {
    const length = array ? array.length : 0;
    return length ? (sum_1.default(array) / length) : NAN;
}
exports.default = mean;
