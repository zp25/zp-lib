import chai from 'chai';
import rewire from 'rewire';

const module = rewire('../src/searchParams');
const { default: searchParams } = module;

chai.should();

describe('searchParams', () => {
  const search = '?foo=1&bar&baz=%E5%A5%BD';
  const obj = {
    foo: '1',
    bar: true,
    baz: '好',
  };

  it ('返回object，存储location.search中的key-value对', () => {
    searchParams(search).should.eql(obj);
  });

  it ('不支持URLSearchParams也能正确转换', () => {
    const restore = module.__set__('URLSearchParams', undefined);

    searchParams(search).should.eql(obj);

    restore();
  });
});
