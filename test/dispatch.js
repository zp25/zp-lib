/* eslint no-unused-expressions: 0 */

import chai from 'chai';
import sinon from 'sinon';
import dispatch from '../src/dispatch';

chai.should();

const buildEvent = type => (
  type
    ? { target: { dataset: { trigger: type } } }
    : { target: { dataset: {} } }
);

describe('dispatch', () => {
  const spyFoo = sinon.spy();
  const spyBar = sinon.spy();

  let listener = null;

  before(() => {
    const handlers = {
      foo: spyFoo,
      bar: spyBar,
    };

    listener = dispatch(handlers);
  });

  afterEach(() => {
    spyFoo.resetHistory();
    spyBar.resetHistory();
  });

  it('正确分发事件', () => {
    const fooEvent = buildEvent('foo');
    const barEvent = buildEvent('bar');

    listener(fooEvent);
    listener(barEvent);
    listener(fooEvent);

    spyFoo.calledTwice.should.be.true;
    spyBar.calledOnce.should.be.true;
  });

  it('没有trigger配置时无反应', () => {
    const emptyEvent = buildEvent();

    listener(emptyEvent);

    spyFoo.callCount.should.equal(0);
    spyBar.callCount.should.equal(0);
  });

  it('没有匹配处理函数时无反应', () => {
    const bazEvent = buildEvent('baz');

    listener(bazEvent);

    spyFoo.callCount.should.equal(0);
    spyBar.callCount.should.equal(0);
  });
});
