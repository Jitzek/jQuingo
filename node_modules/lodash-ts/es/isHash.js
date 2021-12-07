import isObject from './isObject';
export default function isHash(obj) {
    const ret = isObject(obj);
    return ret && obj.constructor === Object && !obj.nodeType && !obj.setInterval;
}
