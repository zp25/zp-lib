/**
 * @module escapeHTML
 * @description 转义字符串
 * @see {@link https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406}
 * @param {string} unsafe - 需转义字符串
 * @return {string} 转义后字符串
 */

const escapeHTML = (unsafe) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return unsafe.replace(/[&<>"']/g, m => map[m]);
};

export default escapeHTML;
