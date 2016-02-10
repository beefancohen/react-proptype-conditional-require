import test from 'tape';
import isRequiredIf from '../isRequiredIf';

test(
  'isRequiredIf function returns a function when given valid args',
  assert => {
    const expected = true;
    const actual = typeof isRequiredIf(() => true, false)  === 'function';

    assert.equals(expected, actual, 'isRequiredIf returns a function');
    assert.end();
  }
);

test(
  'isRequiredIf function throws when validator arg is undefined',
  assert => {
    assert.throws(
      () => {
        isRequiredIf(undefined, true);
      },
      TypeError,
      'Should throw typeError because validator arg is undefined.'
    );
    assert.end();
  }
);

test(
  'isRequiredIf function throws when validator arg is null',
  assert => {
    assert.throws(
      () => {
        isRequiredIf(null, true);
      },
      TypeError,
      'Should throw typeError because validator arg is undefined.'
    );
    assert.end();
  }
);

test(
  'isRequiredIf function throws when validator arg is not a function',
  assert => {
    assert.throws(
      () => {
        isRequiredIf(42, true);
      },
      TypeError,
      'Should throw typeError because validator arg is undefined.'
    );
    assert.end();
  }
);
