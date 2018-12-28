/* eslint no-underscore-dangle: 0, no-unused-expressions: 0 */

import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';
// import storage from '../src/storage';

const wrapper = rewire('../src/storage');

chai.should();

const dataset = {
  illegal: 'illegal data',
  data: {
    foo: 123,
    bar: 'hello world',
  },
};

// localStorage.getItem无匹配时返回null，其余总是返回string
const fakeRead = key => (
  key === 'null' ? null : dataset[key]
);

describe('storage', () => {
  const {
    default: storage,
    StorageTypeError,
  } = wrapper;

  describe('get', () => {
    let fakeSave = null;

    before(() => {
      fakeSave = sinon.spy();

      wrapper.__set__('read', fakeRead);
      wrapper.__set__('save', fakeSave);
    });

    afterEach(() => {
      fakeSave.resetHistory();
    });

    it('无匹配item返回null', () => {
      const item = 'null';
      const store = storage(item);

      (store.get('foo') === null).should.be.true;
    });

    it('item数据格式不合法默认返回undefined，并更新item为空object', () => {
      const item = 'illegal';
      const store = storage(item);

      (typeof store.get('foo') === 'undefined').should.be.true;
      fakeSave.calledWithExactly(item, {}).should.be.true;
    });

    it('若取消forcepdat，item数据格式不合法将抛出错误', () => {
      const item = 'illegal';
      const store = storage(item, false);

      const fn = () => { store.get('foo'); };
      fn.should.throw(StorageTypeError);
    });

    it('正确返回值', () => {
      const item = 'data';
      const { data: { foo, bar } } = dataset;
      const store = storage(item);

      const returns = [
        store.get('foo'),
        store.get('bar'),
        store.get('baz'),
      ];

      returns.should.eql([foo, bar, undefined]);
    });
  });

  describe('set', () => {
    let fakeSave = null;
    const data = {
      foo: true,
    };

    before(() => {
      fakeSave = sinon.spy();

      wrapper.__set__('read', fakeRead);
      wrapper.__set__('save', fakeSave);
    });

    afterEach(() => {
      fakeSave.resetHistory();
    });

    it('无匹配item将新建并写入', () => {
      const item = 'null';
      const store = storage(item);
      const storeThrows = storage(item, false);

      store.set('foo', data.foo);
      fakeSave.calledWithExactly(item, data).should.be.true;

      storeThrows.set('foo', data.foo);
      fakeSave.calledWithExactly(item, data).should.be.true;
    });

    it('item数据格式不合法默认新建object覆盖原值', () => {
      const item = 'illegal';
      const illegalStore = storage(item);

      illegalStore.set('foo', data.foo);
      fakeSave.calledWithExactly(item, data).should.be.true;
    });

    it('取消forceUpdate后向不合法数据item写入时抛出错误', () => {
      const item = 'illegal';
      const store = storage(item, false);

      const fn = () => { store.set('foo', data.foo); };
      fn.should.throw(StorageTypeError);
    });

    it('正确更新值', () => {
      const item = 'data';
      const { data: prevData } = dataset;
      const result = Object.assign({}, prevData, data);

      const store = storage(item);
      store.set('foo', data.foo);

      fakeSave.calledWithExactly(item, result).should.be.true;
    });
  });

  describe('delete', () => {
    let fakeSave = null;

    before(() => {
      fakeSave = sinon.spy();

      wrapper.__set__('read', fakeRead);
      wrapper.__set__('save', fakeSave);
    });

    afterEach(() => {
      fakeSave.resetHistory();
    });

    it('无匹配item将新建，写入空object', () => {
      const item = 'null';
      const store = storage(item);
      const storeThrows = storage(item, false);

      store.delete('foo');
      fakeSave.calledWithExactly(item, {}).should.be.true;

      storeThrows.set('foo');
      fakeSave.calledWithExactly(item, {}).should.be.true;
    });

    it('item数据格式不合法默认新建空object覆盖原值', () => {
      const item = 'illegal';
      const illegalStore = storage(item);

      illegalStore.delete('foo');
      fakeSave.calledWithExactly(item, {}).should.be.true;
    });

    it('取消forceUpdate后尝试删除不合法数据item将抛出错误', () => {
      const item = 'illegal';
      const store = storage(item, false);

      const fn = () => { store.delete('foo'); };
      fn.should.throw(StorageTypeError);
    });

    it('正确删除值', () => {
      const item = 'data';

      const store = storage(item);
      store.delete('foo');

      fakeSave.calledWithExactly(item, { bar: 'hello world' }).should.be.true;
    });
  });
});
