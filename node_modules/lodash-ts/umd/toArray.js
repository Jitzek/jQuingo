(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_getTag", "./isArrayLike", "./isString", "./_iteratorToArray", "./_mapToArray", "./_setToArray", "./_stringToArray", "./values"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:25
    * @CopyRight			飞道科技
    */
    var _getTag_1 = require("./_getTag");
    var isArrayLike_1 = require("./isArrayLike");
    var isString_1 = require("./isString");
    var _iteratorToArray_1 = require("./_iteratorToArray");
    var _mapToArray_1 = require("./_mapToArray");
    var _setToArray_1 = require("./_setToArray");
    var _stringToArray_1 = require("./_stringToArray");
    var values_1 = require("./values");
    /** Built-in value references. */
    var iteratorSymbol = (typeof Symbol != 'undefined' && typeof Symbol.iterator == 'symbol') ? Symbol.iterator : undefined;
    function copyArray(source) {
        var index = -1;
        var length = source.length;
        var array = Array(length);
        while (++index < length) {
            array[index] = source[index];
        }
        return array;
    }
    /**
     * @module lodash-ts/toArray
     * @example
     * import toArray from 'lodash-ts/toArray';
     *
     * toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * toArray(1);
     * // => []
     *
     * toArray(null);
     * // => []
     * @see _.toArray
    */
    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
        if (!value) {
            return [];
        }
        if (isArrayLike_1.default(value)) {
            return isString_1.default(value) ? _stringToArray_1.default(value) : copyArray(value);
        }
        if (iteratorSymbol && value[iteratorSymbol]) {
            return _iteratorToArray_1.default(value[iteratorSymbol]());
        }
        var tag = _getTag_1.default(value), func = tag == _getTag_1.enumTags.mapTag ? _mapToArray_1.default : (tag == _getTag_1.enumTags.setTag ? _setToArray_1.default : values_1.default);
        return func(value);
    }
    exports.default = toArray;
});
