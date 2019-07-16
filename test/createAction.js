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

  it('仅传入type，正确新建action', () => {
    const action = createAction(type);

    action(payload).should.eql({ type, payload });
  });

  it('传入payloadCreator可以过滤payload', () => {
    const payloadCreator = ({ foo, bar: { baz } }) => ({
      foo,
      baz,
    });
    const action = createAction(type, payloadCreator);

    action(payload).should.eql({ type, payload: payloadFiltered });
  });

  it('传入metaCreator可以添加meta数据', () => {
    const metaCreator = ({ foo, bar: { baz } }) => ({
      foo,
      baz,
    });
    const action = createAction(type, null, metaCreator);

    action(payload).should.eql({ type, payload, meta: payloadFiltered });
  });

  it('payload为Error时添加error属性，payload记录err对象', () => {
    const action = createAction(type);
    const err = new Error('an error');

    action(err).should.eql({ type, payload: err, error: true });
  });

  it('actionCreator.toString()返回action type', () => {
    const action = createAction(type);

    action.toString().should.equal(type);
  });
});
