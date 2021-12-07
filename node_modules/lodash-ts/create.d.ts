/**
 * Creates a new object from the given prototype, and copies all enumerable own properties of one or more
 * source objects to the newly created target object.
 *
 * @param prototype The prototype to create a new object from
 * @param mixins Any number of objects whose enumerable own properties will be copied to the created object
 * @return The new object
 */
export declare function create<T extends {}, U extends {}, V extends {}, W extends {}, X extends {}, Y extends {}, Z extends {}>(prototype: T, mixin1: U, mixin2: V, mixin3: W, mixin4: X, mixin5: Y, mixin6: Z): T & U & V & W & X & Y & Z;
export declare function create<T extends {}, U extends {}, V extends {}, W extends {}, X extends {}, Y extends {}>(prototype: T, mixin1: U, mixin2: V, mixin3: W, mixin4: X, mixin5: Y): T & U & V & W & X & Y;
export declare function create<T extends {}, U extends {}, V extends {}, W extends {}, X extends {}>(prototype: T, mixin1: U, mixin2: V, mixin3: W, mixin4: X): T & U & V & W & X;
export declare function create<T extends {}, U extends {}, V extends {}, W extends {}>(prototype: T, mixin1: U, mixin2: V, mixin3: W): T & U & V & W;
export declare function create<T extends {}, U extends {}, V extends {}>(prototype: T, mixin1: U, mixin2: V): T & U & V;
export declare function create<T extends {}, U extends {}>(prototype: T, mixin: U): T & U;
export declare function create<T extends {}>(prototype: T): T;
export default create;
