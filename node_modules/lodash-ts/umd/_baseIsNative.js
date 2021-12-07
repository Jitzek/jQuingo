(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isFunction", "./_isHostObject", "./isObject", "./_toSource", "./_coreJsData"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-17 15:47:25
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:43:47
    * @CopyRight			飞道科技
    */
    var isFunction_1 = require("./isFunction");
    var _isHostObject_1 = require("./_isHostObject");
    var isObject_1 = require("./isObject");
    var _toSource_1 = require("./_toSource");
    var _coreJsData_1 = require("./_coreJsData");
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /** Used to resolve the decompiled source of functions. */
    var funcToString = Function.prototype.toString;
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
        funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
            .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function () {
        var uid = /[^.]+$/.exec(_coreJsData_1.default && _coreJsData_1.default.keys && _coreJsData_1.default.keys.IE_PROTO || '');
        return uid ? ('Symbol(src)_1.' + uid) : '';
    }());
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
        return !!maskSrcKey && (maskSrcKey in func);
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
        if (!isObject_1.default(value) || isMasked(value)) {
            return false;
        }
        var pattern = (isFunction_1.default(value) || _isHostObject_1.default(value)) ? reIsNative : reIsHostCtor;
        return pattern.test(_toSource_1.default(value));
    }
    exports.default = baseIsNative;
});
