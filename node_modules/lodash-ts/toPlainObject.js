"use strict";
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:44
* @CopyRight			飞道科技
*/
Object.defineProperty(exports, "__esModule", { value: true });
const keysIn_1 = require("./keysIn");
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
    const props = keysIn_1.default(value);
    const object = {};
    let index = -1;
    const length = props.length;
    while (++index < length) {
        var key = props[index];
        var newValue = value[key];
        object[key] = newValue;
    }
    return object;
}
exports.default = toPlainObject;
