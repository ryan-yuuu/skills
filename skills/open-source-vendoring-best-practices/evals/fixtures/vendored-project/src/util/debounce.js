// Source: https://github.com/example/tiny-debounce @ a1b2c3d
// License: MIT — Copyright (c) 2024 Jane Developer
// Adapted: 2026-05-01 — verbatim

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
