export declare function copyArray<T>(array: T[], inherited: boolean): T[];
export interface MixinArgs<T extends {}, U extends {}> {
    deep: boolean;
    inherited: boolean;
    sources: U[];
    target: T;
}
export default function _mixin<T extends {}, U extends {}>(kwArgs: MixinArgs<T, U>): T & U;
