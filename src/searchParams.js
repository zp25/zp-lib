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
  let result = {};

  if (typeof URLSearchParams === 'function') {
    const searchParams = new URLSearchParams(search);

    // for (let [key, val] of searchParams) {
    //   result = Object.assign({}, result, {
    //     [key]: val || true,
    //   });
    // }

    result = [...searchParams].reduce((prev, [key, val]) => (
      Object.assign({}, prev, {
        [key]: val || true,
      })
    ), {});
  } else {
    const regex = /([^?&=]+)=?([^&]*)/g;
    let a = '';

    while ((a = regex.exec(search))) {
      result = Object.assign({}, result, {
        [a[1]]: a[2] ? decodeURIComponent(a[2]) : true,
      });
    }
  }

  return result;
};
