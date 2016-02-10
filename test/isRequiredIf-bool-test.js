import test from 'tape';
import isRequiredIf from '../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;

test(
  "Prop is not required, so it validates against validator",
  assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(validator, false)(props, propName, componentName);
  }
);

test(
  "Prop is required and missing so it returns error and does not run validator",
  assert => {
    /* istanbul ignore next */
    const validator = () => assert.fail('The validator has been run.');

    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    assert.throws(
      () => {
        throw isRequiredIf(validator, true)(props, propName, componentName);
      }
    );

    assert.end();
  }
);

test(
  "Prop is required and present so it validates against the validator",
  assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    const props = { foo: 'abc' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(validator, true)(props, propName, componentName);
  }
);

test(
  "Prop is not required, so it validates against React built-in validator",
  assert => {
    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    const valid =
      isRequiredIf(string, false)(props, propName, componentName);

    assert.equals(
      valid,
      null,
      'The validator returns null because it is not required.'
    );
    assert.end();
  }
);

test(
  "Prop is required and missing, so React built-in validator returns error",
  assert => {
    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    assert.throws(
      () => {
        throw isRequiredIf(string, true)(props, propName, componentName);
      }
    );

    assert.end();
  }
);

test(
  "Prop is required and present, so React built-in validator returns null",
  assert => {
    const props = { foo: 'abc' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    const valid =
      isRequiredIf(string, true)(props, propName, componentName);

    assert.equals(valid, null, 'The validator returns null.');
    assert.end();
  }
);
