/**
 * @module searchParams
 * @description 返回object，存储location.search中的key-value对
 * @param {string} search - location.search
 * @return {Object}
 * @example
 * const params = searchParams(location.search);
 * const { foo, bar, baz } = params;
 */

export default (search) => {
  if (typeof URLSearchParams === 'function') {
    const searchParams = new URLSearchParams(search);

    // return [...searchParams].reduce((prev, [key, val]) => ({
    //   ...prev,
    //   [key]: val || true,
    // }), {});

    return Object.fromEntries(
      [...searchParams].map(([key, val]) => [key, val || true]),
    );
  }

  const regex = /([^?&=]+)=?([^&]*)/g;
  let result = {};
  let a = '';

  while ((a = regex.exec(search))) {
    result = {
      ...result,
      [a[1]]: a[2] ? decodeURIComponent(a[2]) : true,
    };
  }

  return result;
};
