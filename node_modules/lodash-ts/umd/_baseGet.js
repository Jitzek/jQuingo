(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_castPath", "./_isKey", "./_toKey"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-17 15:47:20
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:42
    * @CopyRight			飞道科技
    */
    var _castPath_1 = require("./_castPath");
    var _isKey_1 = require("./_isKey");
    var _toKey_1 = require("./_toKey");
    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(obj, path) {
        var arr_path = _isKey_1.default(path, obj) ? [path] : _castPath_1.default(path);
        var index = 0;
        var length = arr_path.length;
        while (obj != null && index < length) {
            obj = obj[_toKey_1.default(arr_path[index++])];
        }
        return (index && index == length) ? obj : undefined;
    }
    exports.default = baseGet;
});
