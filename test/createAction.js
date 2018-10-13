import chai from 'chai';
import createAction from '../src/createAction';

chai.should();

describe('createAction', () => {
  const type = 'NEW_ACTION';
  const payload = {
    foo: 1,
    bar: { baz: 'baz' },
  };
  const payloadFiltered = {
    foo: 1,
    baz: 'baz',
  };
  const err = new Error('an error');

  it('正确新建action', () => {
    const action = createAction(type);

    action(payload).should.eql({ type, payload });
  });

  it('payloadCreator可以过滤payload', () => {
    const payloadCreator = ({ foo, bar: { baz } }) => ({
      foo,
      baz,
    });
    const action = createAction(type, payloadCreator);

    action(payload).should.eql({ type, payload: payloadFiltered });
  });

  it('metaCreator可以添加meta数据', () => {
    const metaCreator = ({ foo, bar: { baz } }) => ({
      foo,
      baz,
    });
    const action = createAction(type, null, metaCreator);

    action(payload).should.eql({ type, payload, meta: payloadFiltered });
  });

  it('payload为Error时正确新建action', () => {
    const action = createAction(type);

    action(err).should.eql({ type, payload: err, error: true });
  });

  it('actionCreator.toString()返回action type', () => {
    const action = createAction(type);

    action.toString().should.equal(type);
  })
});
