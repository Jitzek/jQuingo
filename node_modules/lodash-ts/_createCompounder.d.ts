/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
export default function createCompounder(callback: (previousValue: string, currentValue: string, currentIndex: number, array?: string[]) => string): (str: string) => string;
