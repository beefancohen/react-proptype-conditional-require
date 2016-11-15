/* eslint-env mocha */
import assert from 'assert';
import isRequiredIf from '../../isRequiredIf';

describe('isRequiredIf sanity tests', () => {
  it(
    '...should return a function when given valid args',
    () => {
      const expected = true;
      const actual = typeof isRequiredIf(() => true, false) === 'function';

      assert.equal(expected, actual, 'isRequiredIf returns a function');
    },
  );
});

describe('TypeValidator argument sanity tests', () => {
  it(
    '...should not throw an error when value is a function',
    () => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'Should not throw typeError because typeValidator arg is a function.',
      );
    },
  );

  it(
    '...should throw an error when value is undefined',
    () => {
      assert.throws(
        () => {
          isRequiredIf(undefined, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.',
      );
    },
  );

  it(
    '...should throw an error when value is null',
    () => {
      assert.throws(
        () => {
          isRequiredIf(null, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.',
      );
    },
  );

  it(
    '...should throw an error when value is not a function',
    () => {
      assert.throws(
        () => {
          isRequiredIf(42, true);
        },
        TypeError,
        'Should throw typeError because typeValidator arg is undefined.',
      );
    },
  );
});

describe('Condition argument sanity test', () => {
  it(
    '...should not throw an error when value is a function',
    () => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, () => true);
        },
        undefined,
        'Should not throw typeError because condition arg is a function.',
      );
    },
  );

  it(
    '...should not throw an error when value is a boolean',
    () => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'Should not throw typeError because condition arg is a boolean.',
      );
    },
  );

  it(
    '...should not throw an error when value is an object',
    () => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, {});
        },
        undefined,
        'Should not throw typeError because condition arg is an object.',
      );
    },
  );
});

describe('Message argument sanity tests', () => {
  it(
    '...should not throw an error when argument is not passed',
    () => {
      assert.doesNotThrow(
        () => {
          isRequiredIf(() => null, true);
        },
        undefined,
        'No error was thrown when message arg is not provided.',
      );
    },
  );

  it(
    '...should throw an error when value is not a string',
    () => {
      assert.throws(
        () => {
          isRequiredIf(() => null, true, 42);
        },
        TypeError,
        'A typeError was thrown because message arg was a number.',
      );
    },
  );

  it(
    '...should throw correct error message when prop is required ' +
    'and missing and message is provided',
    () => {
      const props = {};
      const propName = 'foo';

      const err =
        isRequiredIf(() => null, true, 'This is required.')(props, propName);

      assert.ok(
        err instanceof Error,
        'Returns an error because required prop is missing',
      );

      const expectedMessage = 'This is required.';
      const actualMessage = err.message;

      assert.equal(
        actualMessage,
        expectedMessage,
        'The error message is correct',
      );
    },
  );
});
