"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 13:47:56
* @CopyRight			飞道科技
*/
const _baseHas_1 = require("./_baseHas");
const _indexKeys_1 = require("./_indexKeys");
const isArrayLike_1 = require("./isArrayLike");
const _isIndex_1 = require("./_isIndex");
const _isPrototype_1 = require("./_isPrototype");
const isMap_1 = require("./isMap");
const isWeakMap_1 = require("./isWeakMap");
const isSet_1 = require("./isSet");
const isWeakSet_1 = require("./isWeakSet");
/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeKeys = Object.keys;
/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
    return nativeKeys(Object(object));
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
    if (isMap_1.default(object)) {
        const keys = [];
        object.forEach((v, k) => {
            keys.push(k);
        });
        return keys;
    }
    else if (isSet_1.default(object)) {
        const keys = [];
        object.forEach((v, k) => {
            keys.push(k);
        });
        return keys;
    }
    else if (isWeakMap_1.default(object) || isWeakSet_1.default(object)) {
        console.warn('could not get keys from weakmap or weakwet.');
        return [];
    }
    const isProto = _isPrototype_1.default(object);
    if (!(isProto || isArrayLike_1.default(object))) {
        return baseKeys(object);
    }
    const indexes = _indexKeys_1.default(object), skipIndexes = !!indexes, result = indexes || [], length = result.length;
    for (const key in object) {
        if (_baseHas_1.default(object, key) &&
            !(skipIndexes && (key == 'length' || _isIndex_1.default(key, length))) &&
            !(isProto && key == 'constructor')) {
            result.push(key);
        }
    }
    return result;
}
exports.default = keys;
