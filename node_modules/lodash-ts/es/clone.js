/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:26
* @CopyRight			飞道科技
*/
import _mixin from './_mixin';
import isObject from './isObject';
import isArray from './isArray';
import getTag, { enumTags } from './_getTag';
import isBuffer from './isBuffer';
import isHostObject from './_isHostObject';
const cloneableTags = {};
cloneableTags[enumTags.argsTag] = cloneableTags[enumTags.arrayTag] =
    cloneableTags[enumTags.arrayBufferTag] = cloneableTags[enumTags.dataViewTag] =
        cloneableTags[enumTags.boolTag] = cloneableTags[enumTags.dateTag] =
            cloneableTags[enumTags.float32Tag] = cloneableTags[enumTags.float64Tag] =
                cloneableTags[enumTags.int8Tag] = cloneableTags[enumTags.int16Tag] =
                    cloneableTags[enumTags.int32Tag] = cloneableTags[enumTags.mapTag] =
                        cloneableTags[enumTags.numberTag] = cloneableTags[enumTags.objectTag] =
                            cloneableTags[enumTags.regexpTag] = cloneableTags[enumTags.setTag] =
                                cloneableTags[enumTags.stringTag] = cloneableTags[enumTags.symbolTag] =
                                    cloneableTags[enumTags.uint8Tag] = cloneableTags[enumTags.uint8ClampedTag] =
                                        cloneableTags[enumTags.uint16Tag] = cloneableTags[enumTags.uint32Tag] = true;
cloneableTags[enumTags.errorTag] = cloneableTags[enumTags.funcTag] =
    cloneableTags[enumTags.weakMapTag] = false;
function cloneArrayBuffer(arrayBuffer) {
    const result = new ArrayBuffer(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
}
const reFlags = /\w*$/;
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
export default function clone(value, isDeep = false) {
    if (!isObject(value)) {
        return value;
    }
    const isArr = isArray(value);
    if (isArr) {
        const arr = value;
        return arr.map((subValue) => {
            return isDeep ? clone(subValue, isDeep) : subValue;
        });
    }
    else {
        if (isBuffer(value)) {
            const buff = value;
            if (isDeep) {
                return buff.slice();
            }
            else {
                const result = new buff.constructor(buff.length);
                buff.copy(result);
                return result;
            }
        }
        const tag = getTag(value);
        const isFunc = tag == enumTags.funcTag || tag == enumTags.genTag;
        if (isFunc) {
            return value;
        }
        else if (tag == enumTags.argsTag) {
            return value;
        }
        else if (tag == enumTags.objectTag) {
            if (isHostObject(value)) {
                return {};
            }
            return _mixin({
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
                case enumTags.arrayBufferTag:
                    return cloneArrayBuffer(value);
                case enumTags.boolTag:
                case enumTags.dateTag:
                    return ((object) => {
                        return new object.constructor(+object);
                    })(value);
                case enumTags.dataViewTag:
                    return ((dataView) => {
                        const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                        return new DataView(buffer, dataView.byteOffset, dataView.byteLength);
                    })(value);
                case enumTags.float32Tag:
                case enumTags.float64Tag:
                case enumTags.int8Tag:
                case enumTags.int16Tag:
                case enumTags.int32Tag:
                case enumTags.uint8Tag:
                case enumTags.uint8ClampedTag:
                case enumTags.uint16Tag:
                case enumTags.uint32Tag:
                    return ((typedArray) => {
                        const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                    })(value);
                case enumTags.mapTag:
                    return ((map) => {
                        return new Map(Array.from(map.entries()));
                    })(value);
                case enumTags.numberTag:
                    return new Number(value);
                case enumTags.stringTag:
                    return new String(value);
                case enumTags.regexpTag:
                    return ((regexp) => {
                        const result = new RegExp(regexp.source, reFlags.exec(regexp));
                        result.lastIndex = regexp.lastIndex;
                        return result;
                    })(value);
                case enumTags.setTag:
                    return ((set) => {
                        return new Set(Array.from(set.values()).map((val) => {
                            return clone(val, isDeep);
                        }));
                    })(value);
                case enumTags.symbolTag:
                    return ((symbol) => {
                        return Object(symbol.valueOf());
                    })(value);
                default:
                    return value;
            }
        }
    }
}
