import chai from 'chai';
import searchParams from '../src/searchParams';

chai.should();

const remove = (obj, method) => {
  const tmp = obj[method];
  obj[method] = undefined; // eslint-disable-line no-param-reassign

  return () => {
    obj[method] = tmp; // eslint-disable-line no-param-reassign
  };
};

describe('searchParams', () => {
  const search = '?foo=1&bar&baz=%E5%A5%BD';
  const obj = {
    foo: '1',
    bar: true,
    baz: '好',
  };

  it('返回object，存储location.search中的key-value对', () => {
    searchParams(search).should.eql(obj);
  });

  it('不支持URLSearchParams也能正确转换', () => {
    const restore = remove(global, 'URLSearchParams');

    searchParams(search).should.eql(obj);

    restore();
  });
});
