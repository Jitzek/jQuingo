"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 12:00:45
* @CopyRight			飞道科技
*/
const _getTag_1 = require("./_getTag");
const isObjectLike_1 = require("./isObjectLike");
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
function isSet(value) {
    return isObjectLike_1.default(value) && _getTag_1.default(value) == _getTag_1.enumTags.setTag;
}
exports.default = isSet;
