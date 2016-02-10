import test from 'tape';
import isRequiredIf from '../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;

test(
  "Prop is not required, so it validates against typeValidator",
  assert => {
    const typeValidator = () => {
      assert.pass('The typeValidator has been run.');
      assert.end();
    };

    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(typeValidator, false)(props, propName, componentName);
  }
);

test(
  "Prop is required and missing so it returns error " +
  "and does not run typeValidator",
  assert => {
    const typeValidator = () => assert.fail('The typeValidator has been run.');

    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    assert.throws(
      () => {
        throw isRequiredIf(typeValidator, true)(props, propName, componentName);
      }
    );

    assert.end();
  }
);

test(
  "Prop is required and present so it validates against the typeValidator",
  assert => {
    const typeValidator = () => {
      assert.pass('The typeValidator has been run.');
      assert.end();
    };

    const props = { foo: 'abc' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(typeValidator, true)(props, propName, componentName);
  }
);

test(
  "Prop is not required, so it validates against React built-in typeValidator",
  assert => {
    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    const valid =
      isRequiredIf(string, false)(props, propName, componentName);

    assert.equals(
      valid,
      null,
      'The typeValidator returns null because it is not required.'
    );
    assert.end();
  }
);

test(
  "Prop is required and missing, so React built-in typeValidator returns error",
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
  "Prop is required and present, so React built-in typeValidator returns null",
  assert => {
    const props = { foo: 'abc' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    const valid =
      isRequiredIf(string, true)(props, propName, componentName);

    assert.equals(valid, null, 'The typeValidator returns null.');
    assert.end();
  }
);
