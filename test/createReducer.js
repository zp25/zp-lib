import chai from 'chai';
import sinon from 'sinon';
import createReducer from '../src/createReducer';

chai.should();

describe('createReducer', () => {
  const ACTION_FOO = 'ACTION_FOO';
  const ACTION_BAR = 'ACTION_BAR';
  const ACTION_BAZ = 'ACTION_BAZ';

  let reducer = null;
  let initState = null;
  let handlers = null;
  let spyFoo = null;
  let spyBar = null;

  before(() => {
    initState = {
      foo: 1,
      bar: { baz: 'baz' },
    };

    spyFoo = sinon.spy();
    spyBar = sinon.spy();

    handlers = {
      [ACTION_FOO]: spyFoo,
      [ACTION_BAR]: spyBar,
    }

    reducer = createReducer(initState, handlers);
  });

  afterEach(() => {
    spyFoo.resetHistory();
    spyBar.resetHistory();
  });

  it('正确新建reducer', () => {
    const state = 'state';
    const action = { type: ACTION_FOO };

    reducer(state, action);

    spyFoo.calledWithExactly(state, action).should.be.true;
    spyBar.notCalled.should.be.true;
  });

  it('未传入state将使用initState', () => {
    const action = { type: ACTION_BAR };

    reducer(undefined, action);

    spyFoo.notCalled.should.be.true;
    spyBar.calledWithExactly(initState, action).should.be.true;
  });

  it('无匹配handler返回state', () => {
    const state = 'state';
    const action = { type: ACTION_BAZ };

    reducer(state, action).should.equal(state);
  });
});
