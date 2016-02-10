import test from 'tape';
import isRequiredIf from '../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;


test(
  "Prop is determined to not be required based on function",
  assert => {
    const typeValidator = () => {
      assert.pass('The typeValidator has been run.');
      assert.end();
    };

    // will return false, so foo is not required.
    const condition = props => props.hasOwnProperty('bar');

    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(typeValidator, condition)(props, propName, componentName);
  }
);

test(
  "Prop is required based on function but returns error because it is missing",
  assert => {
    const valid = () => assert.fail('The typeValidator has been run.');

    // will return true, so foo is required.
    const condition = props => props.hasOwnProperty('bar');

    const props = { bar: 'x' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    assert.throws(
      () => {
        throw isRequiredIf(valid, condition)(props, propName, componentName);
      }
    );

    assert.end();
  }
);

test(
  "Prop is required based on function and validates against typeValidator",
  assert => {
    const typeValidator = () => {
      assert.pass('The typeValidator is run.');
      assert.end();
    };

    // will return true, so foo is required.
    const condition = props => props.hasOwnProperty('bar');

    const props = { bar: 'x', foo: 'y' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(typeValidator, condition)(props, propName, componentName);
  }
);

test(
  "Prop is not required, so it validates against React built-in typeValidator",
  assert => {
    const props = {};
    const propName = 'foo';
    const componentName = 'FooComponent';

    const valid =
      isRequiredIf(string, () => false)(props, propName, componentName);

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
        throw isRequiredIf(string, () => true)(props, propName, componentName);
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
      isRequiredIf(string, () => true)(props, propName, componentName);

    assert.equals(valid, null, 'The typeValidator returns null.');
    assert.end();
  }
);
