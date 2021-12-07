(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_getTag", "./isArguments", "./isArray", "./isArrayLike", "./isBuffer", "./isFunction", "./isObjectLike", "./isString", "./keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:51:50
    * @CopyRight			飞道科技
    */
    var _getTag_1 = require("./_getTag");
    var isArguments_1 = require("./isArguments");
    var isArray_1 = require("./isArray");
    var isArrayLike_1 = require("./isArrayLike");
    var isBuffer_1 = require("./isBuffer");
    var isFunction_1 = require("./isFunction");
    var isObjectLike_1 = require("./isObjectLike");
    var isString_1 = require("./isString");
    var keys_1 = require("./keys");
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Built-in value references. */
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
    var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
        if (isArrayLike_1.default(value) &&
            (isArray_1.default(value) || isString_1.default(value) || isFunction_1.default(value.splice) ||
                isArguments_1.default(value) || isBuffer_1.default(value))) {
            return !value.length;
        }
        if (isObjectLike_1.default(value)) {
            var tag = _getTag_1.default(value);
            if (tag == _getTag_1.enumTags.mapTag || tag == _getTag_1.enumTags.setTag) {
                return !value.size;
            }
        }
        for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
                return false;
            }
        }
        return !(nonEnumShadows && keys_1.default(value).length);
    }
    exports.default = isEmpty;
});
