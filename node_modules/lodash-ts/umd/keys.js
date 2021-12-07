(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_baseHas", "./_indexKeys", "./isArrayLike", "./_isIndex", "./_isPrototype", "./isMap", "./isWeakMap", "./isSet", "./isWeakSet"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 13:47:56
    * @CopyRight			飞道科技
    */
    var _baseHas_1 = require("./_baseHas");
    var _indexKeys_1 = require("./_indexKeys");
    var isArrayLike_1 = require("./isArrayLike");
    var _isIndex_1 = require("./_isIndex");
    var _isPrototype_1 = require("./_isPrototype");
    var isMap_1 = require("./isMap");
    var isWeakMap_1 = require("./isWeakMap");
    var isSet_1 = require("./isSet");
    var isWeakSet_1 = require("./isWeakSet");
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = Object.keys;
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
            var keys_1 = [];
            object.forEach(function (v, k) {
                keys_1.push(k);
            });
            return keys_1;
        }
        else if (isSet_1.default(object)) {
            var keys_2 = [];
            object.forEach(function (v, k) {
                keys_2.push(k);
            });
            return keys_2;
        }
        else if (isWeakMap_1.default(object) || isWeakSet_1.default(object)) {
            console.warn('could not get keys from weakmap or weakwet.');
            return [];
        }
        var isProto = _isPrototype_1.default(object);
        if (!(isProto || isArrayLike_1.default(object))) {
            return baseKeys(object);
        }
        var indexes = _indexKeys_1.default(object), skipIndexes = !!indexes, result = indexes || [], length = result.length;
        for (var key in object) {
            if (_baseHas_1.default(object, key) &&
                !(skipIndexes && (key == 'length' || _isIndex_1.default(key, length))) &&
                !(isProto && key == 'constructor')) {
                result.push(key);
            }
        }
        return result;
    }
    exports.default = keys;
});
