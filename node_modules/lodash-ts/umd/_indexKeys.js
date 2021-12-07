(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isArguments", "./isArray", "./isLength", "./isString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:45
    * @CopyRight			飞道科技
    */
    var isArguments_1 = require("./isArguments");
    var isArray_1 = require("./isArray");
    var isLength_1 = require("./isLength");
    var isString_1 = require("./isString");
    /**
     * Creates an array of index keys for `object` values of arrays,
     * `arguments` objects, and strings, otherwise `null` is returned.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array|null} Returns index keys, else `null`.
     */
    function indexKeys(object) {
        var len = object ? object.length : undefined;
        if (isLength_1.default(len) &&
            (isArray_1.default(object) || isString_1.default(object) || isArguments_1.default(object))) {
            var index = -1;
            var result = Array(len);
            while (++index < len) {
                result[index] = String(index);
            }
            return result;
        }
        return null;
    }
    exports.default = indexKeys;
});
