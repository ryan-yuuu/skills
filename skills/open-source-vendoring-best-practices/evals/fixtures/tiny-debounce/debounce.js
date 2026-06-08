/**
 * Returns a debounced version of `fn` that delays invocation until `wait`
 * milliseconds have elapsed since the last call.
 */
export function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}
