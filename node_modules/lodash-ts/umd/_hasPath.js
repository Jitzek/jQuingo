(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_castPath", "./isArguments", "./isArray", "./_isIndex", "./_isKey", "./isLength", "./isString", "./_toKey"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 11:48:32
    * @CopyRight			飞道科技
    */
    var _castPath_1 = require("./_castPath");
    var isArguments_1 = require("./isArguments");
    var isArray_1 = require("./isArray");
    var _isIndex_1 = require("./_isIndex");
    var _isKey_1 = require("./_isKey");
    var isLength_1 = require("./isLength");
    var isString_1 = require("./isString");
    var _toKey_1 = require("./_toKey");
    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(obj, path, hasFunc) {
        var path_arr = _isKey_1.default(path, obj) ? [path] : _castPath_1.default(path);
        var index = -1;
        var length = path_arr.length;
        var key = undefined;
        while (++index < length) {
            key = _toKey_1.default(path_arr[index]);
            if (!(obj != null && hasFunc(obj, key))) {
                return true;
            }
            obj = obj[key];
        }
        length = obj ? obj.length : 0;
        return !!length && isLength_1.default(length) && _isIndex_1.default(key, length) &&
            (isArray_1.default(obj) || isString_1.default(obj) || isArguments_1.default(obj));
    }
    exports.default = hasPath;
});
