/**
 * 转换逻辑
 * @ignore
 */
const core = data => (key) => {
  let replace = '';

  if (typeof key === 'function') {
    replace = key(data[key.displayName]);
  } else if (typeof key === 'object') {
    replace = key.content(data[key.name]);
  } else {
    replace = data[key] === undefined ? key : data[key];
  }

  return replace;
};

/**
 * @module templater
 * @description 模版引擎
 * @example <caption>通过string查找</caption>
 * const template = templater`
 *   <div class="content">
 *     <p>${'content'}</p>
 *     <p>${'nil'}</p>
 *   </div>
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
 * const context = { content: ['foo', 'bar', 'baz'] };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过object查找，若function的displayName和data的key不匹配，设置{ name, content }映射关系</caption>
 * const content = () => ({
 *   name: 'key',
 *   content: data => data,
 * });
 *
 * const template = templater`
 *   <p class="content">${content()}</p>
 * `;
 *
 * const context = { key: 'foo' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过object查找的另一种用法</caption>
 * const content = (type) => {
 *   const foo = {
 *     name: 'keyA',
 *     content: data => `content A: ${data}`,
 *   };
 *
 *   const bar = {
 *     name: 'keyB',
 *     content: data => `content B: ${data}`,
 *   };
 *
 *   return type === 1 ? foo : bar;
 * };
 *
 * const template = templater`
 *   <div class="content">
 *     <p>${content(1)}</p>
 *     <p>${content()}</p>
 *   </div>
 * `;
 *
 * const context = { keyA: 'foo', keyB: 'bar' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 */
const templater = (strs, ...keys) => (data) => {
  const arr = Array.isArray(data) ? data : [data];

  const result = arr.map(d => (
    keys.reduce((prev, key, i) => (
      prev + core(d)(key) + strs[i + 1]
    ), strs[0])
  ));

  return result.join('');
};

/**
 * @module templaterAsync
 * @description 异步模版引擎，没使用async/await避免regenerator
 * @example
 * const content = data => Promise.resolve(`<p>${data}</p>`);
 * content.displayName = 'content';
 *
 * const template = templaterAsync`
 *   <div class="content">${content}</div>
 * `;
 *
 * const context = { content: 'Hello World!' };
 * const result = await template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 */
const templaterAsync = (strs, ...keys) => (data) => {
  const arr = Array.isArray(data) ? data : [data];

  return Promise.all(arr.map(d => (
    Promise.all(keys.map(core(d))).then(resolved => (
      resolved.reduce((prev, r, i) => prev + r + strs[i + 1], strs[0])
    ))
  ))).then(result => result.join(''));
};
// const templaterAsync = (strs, ...keys) => async (data) => {
//   const arr = Array.isArray(data) ? data : [data];

//   const result = await Promise.all(arr.map(async (d) => {
//     const resolved = await Promise.all(keys.map(core(d)));

//     return resolved.reduce((prev, r, i) => prev + r + strs[i + 1], strs[0]);
//   }));

//   return result.join('');
// };

export {
  templater,
  templaterAsync,
};
