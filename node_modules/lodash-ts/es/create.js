import assign from './assign';
export function create(prototype, ...mixins) {
    if (!mixins.length) {
        throw new RangeError('create requires at least one mixin object.');
    }
    const args = mixins.slice();
    args.unshift(Object.create(prototype));
    return assign.apply(null, args);
}
export default create;
