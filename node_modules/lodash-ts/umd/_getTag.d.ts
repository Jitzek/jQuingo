export declare enum enumTags {
    mapTag = 0,
    objectTag = 1,
    promiseTag = 2,
    setTag = 3,
    weakMapTag = 4,
    dataViewTag = 5,
    argsTag = 6,
    arrayTag = 7,
    boolTag = 8,
    dateTag = 9,
    errorTag = 10,
    funcTag = 11,
    genTag = 12,
    numberTag = 13,
    regexpTag = 14,
    stringTag = 15,
    symbolTag = 16,
    arrayBufferTag = 17,
    float32Tag = 18,
    float64Tag = 19,
    int8Tag = 20,
    int16Tag = 21,
    int32Tag = 22,
    uint8Tag = 23,
    uint8ClampedTag = 24,
    uint16Tag = 25,
    uint32Tag = 26
}
export declare function str2tag(tag: string): enumTags;
declare let getTag: (value: any) => enumTags;
export default getTag;
