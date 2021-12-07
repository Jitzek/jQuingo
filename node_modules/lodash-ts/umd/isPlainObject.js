(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_getPrototype", "./_isHostObject", "./isObjectLike"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * @Author:				taoqf
    * @Date:				2016-06-15 11:59:02
     * @Last Modified by: taoqf
     * @Last Modified time: 2017-10-17 12:00:26
    * @CopyRight			飞道科技
    */
    var _getPrototype_1 = require("./_getPrototype");
    var _isHostObject_1 = require("./_isHostObject");
    var isObjectLike_1 = require("./isObjectLike");
    /** `Object#toString` result references. */
    var objectTag = '[object Object]';
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    /** Used to resolve the decompiled source of functions. */
    var funcToString = Function.prototype.toString;
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;
    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object,
     *  else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
        if (!isObjectLike_1.default(value) ||
            objectToString.call(value) != objectTag || _isHostObject_1.default(value)) {
            return false;
        }
        var proto = _getPrototype_1.default(value);
        if (proto === null) {
            return true;
        }
        var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return (typeof Ctor == 'function' &&
            Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
    }
    exports.default = isPlainObject;
});
