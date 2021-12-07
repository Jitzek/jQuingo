import _mixin from './_mixin';
export const assign = !!Object.assign ?
    Object.assign :
    // function<T extends {}, U extends {}> (target: T, ...sources: (U | null | undefined)[]): T&U {
    function (target, ...sources) {
        return _mixin({
            deep: false,
            inherited: false,
            sources: sources,
            target: target
        });
    };
export default assign;
