/* eslint no-unused-expressions: 0 */

import chai from 'chai';
import machine from '../src/machine';

chai.should();

describe('machine', () => {
  let transition = null;

  const dict = {
    stateA: {
      ACTION1: 'stateB',
      ACTION2: 'stateA',
    },
    stateB: {
      ACTION3: 'stateA',
    },
  };

  before(() => {
    transition = machine(dict);
  });

  it('匹配成功返回下一状态', () => {
    transition('stateA')('ACTION1').should.equal('stateB');
    transition('stateA')('ACTION2').should.equal('stateA');
    transition('stateB')('ACTION3').should.equal('stateA');
  });

  it('匹配失败返回false', () => {
    transition('stateA')('ACTION3').should.be.false;
    transition('stateB')('ACTION1').should.be.false;
    transition('stateB')('ACTION2').should.be.false;

    transition('stateNull')('ACTION1').should.be.false;
  });
});
