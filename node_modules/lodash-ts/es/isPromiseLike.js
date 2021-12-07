import isFunction from './isFunction';
export default function isPromiseLike(obj) {
    return obj && isFunction(obj.then);
}
