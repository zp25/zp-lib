/**
 * base64编码
 * @param  {string} str 需编码字符串
 * @return {string}
 */
const encodeBase64 = str => (
  window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => (
    String.fromCharCode(`0x${p1}`)
  )))
);

/**
 * base64解码
 * @param  {string} str 需解码字符串，原字符串需utf-8编码
 * @return {string}
 */
const decodeBase64 = str => (
  decodeURIComponent(Array.from(window.atob(str)).map(c => (
    `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
  )).join(''))
);

export {
  encodeBase64,
  decodeBase64,
};
