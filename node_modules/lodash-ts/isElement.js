"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 11:51:40
* @CopyRight			飞道科技
*/
const isObjectLike_1 = require("./isObjectLike");
const isPlainObject_1 = require("./isPlainObject");
/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element,
 *  else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
    return !!value && value.nodeType === 1 && isObjectLike_1.default(value) && !isPlainObject_1.default(value);
}
exports.default = isElement;
