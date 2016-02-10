import test from 'tape';
import isRequiredIf from '../../isRequiredIf';

test('isRequiredIf sanity tests', nest => {
  nest.test(
    '...should return a function when given valid args',
    assert => {
      const expected = true;
      const actual = typeof isRequiredIf(() => true, false)  === 'function';

      assert.equals(expected, actual, 'isRequiredIf returns a function');
      assert.end();
    }
  );
});

test('TypeValidator argument sanity tests', nest => {
  nest.test(
    '...should not throw an error when value is a function',
    assert => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'Should not throw typeError because typeValidator arg is a function.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should throw an error when value is undefined',
    assert => {
      assert.throws(
        () => {
          isRequiredIf(undefined, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should throw an error when value is null',
    assert => {
      assert.throws(
        () => {
          isRequiredIf(null, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should throw an error when value is not a function',
    assert => {
      assert.throws(
        () => {
          isRequiredIf(42, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.'
      );
      assert.end();
    }
  );
});

test('Condition argument sanity test', nest => {
  nest.test(
    '...should not throw an error when value is a function',
    assert => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, () => true);
        },
        undefined,
        'Should not throw typeError because condition arg is a function.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should not throw an error when value is a boolean',
    assert => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'Should not throw typeError because condition arg is a boolean.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should not throw an error when value is an object',
    assert => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, {});
        },
        undefined,
        'Should not throw typeError because condition arg is an object.'
      );
      assert.end();
    }
  );
});

test('Message argument sanity tests', nest => {
  nest.test(
    '...should not throw an error when argument is not passed',
    assert => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'No error was thrown when message arg is not provided.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should throw an error when value is not a string',
    assert => {
      assert.throws(
        () => {
          isRequiredIf(() => null, true, 42);
        },
        TypeError,
        'A typeError was thrown because message arg was a number.'
      );
      assert.end();
    }
  );

  nest.test(
    '...should throw correct error message when prop is required ' +
    'and missing and message is provided',
    assert => {
      const props = {};
      const propName = 'foo';

      const err =
        isRequiredIf(() => null, true, 'This is required.')(props, propName);

      assert.ok(err instanceof Error);

      const expectedMessage = 'This is required.';
      const actualMessage = err.message;

      assert.equals(
        actualMessage,
        expectedMessage,
        'The error message is correct'
      );
      assert.end();
    }
  );
});
