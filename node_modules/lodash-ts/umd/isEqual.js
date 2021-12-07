(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isObject", "./isObjectLike", "./isArray", "./_isHostObject", "./isTypedArray", "./_mapToArray", "./_setToArray", "./_getTag", "./keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:56:28
    * @CopyRight			飞道科技
    */
    var isObject_1 = require("./isObject");
    var isObjectLike_1 = require("./isObjectLike");
    var isArray_1 = require("./isArray");
    var _isHostObject_1 = require("./_isHostObject");
    var isTypedArray_1 = require("./isTypedArray");
    var _mapToArray_1 = require("./_mapToArray");
    var _setToArray_1 = require("./_setToArray");
    var _getTag_1 = require("./_getTag");
    var keys_1 = require("./keys");
    /** Used to convert symbols to primitives and strings. */
    var symbolProto = typeof Symbol != 'undefined' ? Symbol.prototype : undefined;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
    /** Used to compose bitmasks for comparison styles. */
    var UNORDERED_COMPARE_FLAG = 1;
    var PARTIAL_COMPARE_FLAG = 2;
    function equalArrays(array, other, equalFunc) {
        var arrLength = array.length, othLength = other.length;
        if (arrLength != othLength) {
            return false;
        }
        // Assume cyclic values are equal.
        var index = -1, result = true;
        // Ignore non-index properties.
        while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            // Recursively compare arrays (susceptible to call stack limits).
            if (!(arrValue === othValue ||
                equalFunc(arrValue, othValue))) {
                result = false;
                break;
            }
        }
        return result;
    }
    function equalByTag(object, other, tag, equalFunc) {
        switch (tag) {
            case _getTag_1.enumTags.dataViewTag:
                if ((object.byteLength != other.byteLength) ||
                    (object.byteOffset != other.byteOffset)) {
                    return false;
                }
                object = object.buffer;
                other = other.buffer;
            case _getTag_1.enumTags.arrayBufferTag:
                if ((object.byteLength != other.byteLength) ||
                    !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                    return false;
                }
                return true;
            case _getTag_1.enumTags.boolTag:
            case _getTag_1.enumTags.dateTag:
                // Coerce dates and booleans to numbers, dates to milliseconds and
                // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
                // not equal.
                return +object == +other;
            case _getTag_1.enumTags.errorTag:
                return object.name == other.name && object.message == other.message;
            case _getTag_1.enumTags.numberTag:
                // Treat `NaN` vs. `NaN` as equal.
                return (object != +object) ? other != +other : object == +other;
            case _getTag_1.enumTags.regexpTag:
            case _getTag_1.enumTags.stringTag:
                // Coerce regexes to strings and treat strings, primitives and objects,
                // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
                // for more details.
                return object == (other + '');
            case _getTag_1.enumTags.mapTag:
                if (object.size != other.size) {
                    return false;
                }
                // Recursively compare objects (susceptible to call stack limits).
                return equalArrays(_mapToArray_1.default(object), _mapToArray_1.default(other), equalFunc);
            case _getTag_1.enumTags.setTag:
                if (object.size != other.size) {
                    return false;
                }
                // Recursively compare objects (susceptible to call stack limits).
                return equalArrays(_setToArray_1.default(object), _setToArray_1.default(other), equalFunc);
            case _getTag_1.enumTags.symbolTag:
                if (symbolValueOf) {
                    return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
        }
        return false;
    }
    function equalObjects(object, other, equalFunc) {
        var objProps = keys_1.default(object), objLength = objProps.length, othProps = keys_1.default(other), othLength = othProps.length;
        if (objLength != othLength) {
            return false;
        }
        var index = objLength;
        while (index--) {
            var key = objProps[index];
            if (!(key in other)) {
                return false;
            }
        }
        // Assume cyclic values are equal.
        while (++index < objLength) {
            var key = objProps[index];
            var objValue = object[key], othValue = other[key];
            // Recursively compare objects (susceptible to call stack limits).
            if (!(objValue === othValue || equalFunc(objValue, othValue))) {
                return false;
            }
        }
        return true;
    }
    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc) {
        var objIsArr = isArray_1.default(object), othIsArr = isArray_1.default(other), objTag = _getTag_1.enumTags.arrayTag, othTag = _getTag_1.enumTags.arrayTag;
        if (!objIsArr) {
            objTag = _getTag_1.default(object);
            objTag = objTag == _getTag_1.enumTags.argsTag ? _getTag_1.enumTags.objectTag : objTag;
        }
        if (!othIsArr) {
            othTag = _getTag_1.default(other);
            othTag = othTag == _getTag_1.enumTags.argsTag ? _getTag_1.enumTags.objectTag : othTag;
        }
        var objIsObj = objTag == _getTag_1.enumTags.objectTag && !_isHostObject_1.default(object), othIsObj = othTag == _getTag_1.enumTags.objectTag && !_isHostObject_1.default(other), isSameTag = objTag == othTag;
        if (isSameTag && !objIsObj) {
            return (objIsArr || isTypedArray_1.default(object))
                ? equalArrays(object, other, equalFunc)
                : equalByTag(object, other, objTag, equalFunc);
        }
        if (!isSameTag) {
            return false;
        }
        return equalObjects(object, other, equalFunc);
    }
    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are **not** supported.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent,
     *  else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
        if (value === other) {
            return true;
        }
        if (value == null || other == null || (!isObject_1.default(value) && !isObjectLike_1.default(other))) {
            return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, isEqual);
    }
    exports.default = isEqual;
});
