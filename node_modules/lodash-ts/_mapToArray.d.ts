/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
export default function mapToArray<K, V>(map: Map<K, V>): [K, V][];
