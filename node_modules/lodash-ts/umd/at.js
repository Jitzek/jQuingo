(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_baseFlatten", "./get"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:41
    * @CopyRight			飞道科技
    */
    var _baseFlatten_1 = require("./_baseFlatten");
    var get_1 = require("./get");
    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths of elements to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    function at(object, paths) {
        paths = _baseFlatten_1.default(paths, 1);
        var index = -1;
        var isNil = object == null;
        var length = paths.length;
        var result = Array(length);
        while (++index < length) {
            result[index] = isNil ? undefined : get_1.default(object, paths[index]);
        }
        return result;
    }
    exports.default = at;
});
