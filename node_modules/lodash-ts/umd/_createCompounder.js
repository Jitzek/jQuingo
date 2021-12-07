(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deburr", "./words"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
    * @Last Modified by:	taoqf
    * @Last Modified time:	2016-06-17 15:54:51
    * @CopyRight			飞道科技
    */
    var deburr_1 = require("./deburr");
    var words_1 = require("./words");
    /** Used to compose unicode capture groups. */
    var rsApos = "['\u2019]";
    /** Used to match apostrophes. */
    var reApos = RegExp(rsApos, 'g');
    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
        return function (str) {
            return words_1.default(deburr_1.default(str).replace(reApos, '')).reduce(callback, '');
        };
    }
    exports.default = createCompounder;
});
