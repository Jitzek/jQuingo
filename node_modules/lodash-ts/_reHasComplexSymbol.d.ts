/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
declare const reHasComplexSymbol: RegExp;
export default reHasComplexSymbol;
