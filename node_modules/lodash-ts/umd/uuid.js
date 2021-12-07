(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ## 生成一个唯一标识ID
     * @param  {number} [len=36]   长度
     * @param  {number} [salt=62] 随机数
     * @return {string}       生成唯一标识ID
     */
    function uuid(len, salt) {
        var CHARS = '0123456789abcdef'.split('');
        var chars = CHARS;
        var uuid = [];
        var rnd = Math.random;
        salt = salt || new Date().getTime();
        if (len) {
            for (var i = 0; i < len; i++) {
                uuid[i] = chars[0 | rnd() * salt];
            }
        }
        else {
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (var i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    var r = 0 | rnd() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
                }
            }
        }
        return uuid.join(''); //.replace(/-/g, '');
    }
    exports.default = uuid;
});
