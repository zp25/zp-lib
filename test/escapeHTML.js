import chai from 'chai';
import escapeHTML from '../src/escapeHTML';

chai.should();

describe('escapeHTML', () => {
  it('正确转义字符串', () => {
    const unsafe = '<script>alert(\'&\');</script>';
    const safe = '&lt;script&gt;alert(&#039;&amp;&#039;);&lt;/script&gt;';

    escapeHTML(unsafe).should.equal(safe);
  });
});
