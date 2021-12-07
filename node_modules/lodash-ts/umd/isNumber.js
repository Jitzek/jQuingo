(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isObjectLike"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 12:00:20
    * @CopyRight			飞道科技
    */
    var isObjectLike_1 = require("./isObjectLike");
    /** `Object#toString` result references. */
    var numberTag = '[object Number]';
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;
    /**
     * @module lodash-ts/isNumber
     * @example
     * import isNumber from 'lodash-ts/isNumber';
     * isNumber(3);
     * // => true
     *
     * isNumber(Number.MIN_VALUE);
     * // => true
     *
     * isNumber(Infinity);
     * // => true
     *
     * isNumber('3');
     * // => false
     * @see _.isNumber
    */
    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
        return typeof value == 'number' ||
            (isObjectLike_1.default(value) && objectToString.call(value) == numberTag);
    }
    exports.default = isNumber;
});
