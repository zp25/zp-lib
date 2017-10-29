/**
 * @module templater
 * @description 模版引擎
 * @example <caption>通过string查找</caption>
 * const template = templater`
 *   <p class="content">${'content'}</p>
 * `;
 *
 * const context = { content: 'Hello World' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过function查找，注意设置函数的displayName属性为data对应的key</caption>
 * const content = data => (
 *   Array.isArray(data) ?
 *     data.reduce((prev, d) => `${prev}<p>${d}</p>`, '') :
 *     `<p>${data}</p>`
 * );
 * content.displayName = 'content';
 *
 * const template = templater`
 *   <div class="content">${content}</div>
 * `;
 *
 * const context = { content: ['A', 'B', 'C'] };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 */

export default (strs, ...keys) => (data) => {
  const arr = Array.isArray(data) ? data.slice() : [Object.assign({}, data)];
  const lastIndex = strs.length - 1;

  const dataArr = arr.map(d => (
    keys.map((key, i) => {
      let replace = '';
      if (typeof key === 'function') {
        replace = key(d[key.displayName]);
      } else if (typeof key === 'object') {
        replace = key.content(d[key.name]);
      } else {
        replace = d[key] === undefined ? key : d[key];
      }

      return strs[i] + replace;
    }).join('') + strs[lastIndex]
  ));

  return dataArr.join('');
};
