/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:26
* @CopyRight			飞道科技
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_mixin", "./isObject", "./isArray", "./_getTag", "./isBuffer", "./_isHostObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _mixin_1 = require("./_mixin");
    var isObject_1 = require("./isObject");
    var isArray_1 = require("./isArray");
    var _getTag_1 = require("./_getTag");
    var isBuffer_1 = require("./isBuffer");
    var _isHostObject_1 = require("./_isHostObject");
    var cloneableTags = {};
    cloneableTags[_getTag_1.enumTags.argsTag] = cloneableTags[_getTag_1.enumTags.arrayTag] =
        cloneableTags[_getTag_1.enumTags.arrayBufferTag] = cloneableTags[_getTag_1.enumTags.dataViewTag] =
            cloneableTags[_getTag_1.enumTags.boolTag] = cloneableTags[_getTag_1.enumTags.dateTag] =
                cloneableTags[_getTag_1.enumTags.float32Tag] = cloneableTags[_getTag_1.enumTags.float64Tag] =
                    cloneableTags[_getTag_1.enumTags.int8Tag] = cloneableTags[_getTag_1.enumTags.int16Tag] =
                        cloneableTags[_getTag_1.enumTags.int32Tag] = cloneableTags[_getTag_1.enumTags.mapTag] =
                            cloneableTags[_getTag_1.enumTags.numberTag] = cloneableTags[_getTag_1.enumTags.objectTag] =
                                cloneableTags[_getTag_1.enumTags.regexpTag] = cloneableTags[_getTag_1.enumTags.setTag] =
                                    cloneableTags[_getTag_1.enumTags.stringTag] = cloneableTags[_getTag_1.enumTags.symbolTag] =
                                        cloneableTags[_getTag_1.enumTags.uint8Tag] = cloneableTags[_getTag_1.enumTags.uint8ClampedTag] =
                                            cloneableTags[_getTag_1.enumTags.uint16Tag] = cloneableTags[_getTag_1.enumTags.uint32Tag] = true;
    cloneableTags[_getTag_1.enumTags.errorTag] = cloneableTags[_getTag_1.enumTags.funcTag] =
        cloneableTags[_getTag_1.enumTags.weakMapTag] = false;
    function cloneArrayBuffer(arrayBuffer) {
        var result = new ArrayBuffer(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBuffer));
        return result;
    }
    var reFlags = /\w*$/;
    /**
     * @module lodash-ts/clone
     * @example
     * import clone from 'lodash-ts/clone';
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     * @see _.clone
    */
    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value, isDeep) {
        if (isDeep === void 0) { isDeep = false; }
        if (!isObject_1.default(value)) {
            return value;
        }
        var isArr = isArray_1.default(value);
        if (isArr) {
            var arr = value;
            return arr.map(function (subValue) {
                return isDeep ? clone(subValue, isDeep) : subValue;
            });
        }
        else {
            if (isBuffer_1.default(value)) {
                var buff = value;
                if (isDeep) {
                    return buff.slice();
                }
                else {
                    var result = new buff.constructor(buff.length);
                    buff.copy(result);
                    return result;
                }
            }
            var tag = _getTag_1.default(value);
            var isFunc = tag == _getTag_1.enumTags.funcTag || tag == _getTag_1.enumTags.genTag;
            if (isFunc) {
                return value;
            }
            else if (tag == _getTag_1.enumTags.argsTag) {
                return value;
            }
            else if (tag == _getTag_1.enumTags.objectTag) {
                if (_isHostObject_1.default(value)) {
                    return {};
                }
                return _mixin_1.default({
                    deep: isDeep,
                    inherited: false,
                    sources: [value],
                    target: {}
                });
            }
            else {
                if (!cloneableTags[tag]) {
                    return value;
                }
                switch (tag) {
                    case _getTag_1.enumTags.arrayBufferTag:
                        return cloneArrayBuffer(value);
                    case _getTag_1.enumTags.boolTag:
                    case _getTag_1.enumTags.dateTag:
                        return (function (object) {
                            return new object.constructor(+object);
                        })(value);
                    case _getTag_1.enumTags.dataViewTag:
                        return (function (dataView) {
                            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                            return new DataView(buffer, dataView.byteOffset, dataView.byteLength);
                        })(value);
                    case _getTag_1.enumTags.float32Tag:
                    case _getTag_1.enumTags.float64Tag:
                    case _getTag_1.enumTags.int8Tag:
                    case _getTag_1.enumTags.int16Tag:
                    case _getTag_1.enumTags.int32Tag:
                    case _getTag_1.enumTags.uint8Tag:
                    case _getTag_1.enumTags.uint8ClampedTag:
                    case _getTag_1.enumTags.uint16Tag:
                    case _getTag_1.enumTags.uint32Tag:
                        return (function (typedArray) {
                            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                        })(value);
                    case _getTag_1.enumTags.mapTag:
                        return (function (map) {
                            return new Map(Array.from(map.entries()));
                        })(value);
                    case _getTag_1.enumTags.numberTag:
                        return new Number(value);
                    case _getTag_1.enumTags.stringTag:
                        return new String(value);
                    case _getTag_1.enumTags.regexpTag:
                        return (function (regexp) {
                            var result = new RegExp(regexp.source, reFlags.exec(regexp));
                            result.lastIndex = regexp.lastIndex;
                            return result;
                        })(value);
                    case _getTag_1.enumTags.setTag:
                        return (function (set) {
                            return new Set(Array.from(set.values()).map(function (val) {
                                return clone(val, isDeep);
                            }));
                        })(value);
                    case _getTag_1.enumTags.symbolTag:
                        return (function (symbol) {
                            return Object(symbol.valueOf());
                        })(value);
                    default:
                        return value;
                }
            }
        }
    }
    exports.default = clone;
});
