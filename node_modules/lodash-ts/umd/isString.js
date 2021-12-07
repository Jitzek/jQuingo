(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isArray", "./isObjectLike"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 12:00:50
    * @CopyRight			飞道科技
    */
    var isArray_1 = require("./isArray");
    var isObjectLike_1 = require("./isObjectLike");
    /** `Object#toString` result references. */
    var stringTag = '[object String]';
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;
    /**
     * @module lodash-ts/isString
     * @example
     * import isString from 'lodash-ts/isString';
     *
     * isString('abc');
     * // => true
     *
     * isString(1);
     * // => false
     * @see _.isString
    */
    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
        return typeof value == 'string' ||
            (!isArray_1.default(value) && isObjectLike_1.default(value) && objectToString.call(value) == stringTag);
    }
    exports.default = isString;
});
