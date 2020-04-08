/**
 * Determine if something is a function.
 *
 * @param {any} val
 *
 * @return {boolean}
 */
export function isFunction(val: any): val is Function {
  return typeof val === 'function';
}
