"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* @Author:				taoqf
* @Date:				2016-06-17 15:47:25
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-10-17 11:43:47
* @CopyRight			飞道科技
*/
const isFunction_1 = require("./isFunction");
const _isHostObject_1 = require("./_isHostObject");
const isObject_1 = require("./isObject");
const _toSource_1 = require("./_toSource");
const _coreJsData_1 = require("./_coreJsData");
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */
const reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */
const objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */
const funcToString = Function.prototype.toString;
/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */
const reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Used to detect methods masquerading as native. */
const maskSrcKey = (function () {
    const uid = /[^.]+$/.exec(_coreJsData_1.default && _coreJsData_1.default.keys && _coreJsData_1.default.keys.IE_PROTO || '');
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
    const pattern = (isFunction_1.default(value) || _isHostObject_1.default(value)) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource_1.default(value));
}
exports.default = baseIsNative;
