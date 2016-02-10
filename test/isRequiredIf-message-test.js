import test from 'tape';
import isRequiredIf from '../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;

test(
  'It should not throw an error if message arg is missing',
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

test(
  'It should throw when provided a message arg that is not a string',
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

test(
  'It throws correct error message when prop is required ' +
  'by custom typeValidator and message is provided',
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

test(
  'It throws correct error message when prop is required ' +
  'by React typeValidator and message is provided',
  assert => {
    const props = {};
    const propName = 'foo';

    const err =
      isRequiredIf(string, true, 'This is required.')(props, propName);

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
