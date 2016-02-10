import test from 'tape';
import isRequiredIf from '../isRequiredIf';

test('isRequiredIf function returns a function',
  assert => {
    const expected = true;
    const actual = typeof isRequiredIf(() => true, false)  === 'function';

    assert.equals(expected, actual, 'isRequiredIf returns a function');
    assert.end();
  }
);
