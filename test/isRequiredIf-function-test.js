import test from 'tape';
import isRequiredIf from '../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;

test('Function conditional tests', nest => {
  nest.test(
    "...prop is not required and validates against custom typeValidator",
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

  nest.test(
    "...prop is not required and validates against React typeValidator",
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

  nest.test(
    "...prop is required and returns error because it is missing",
    assert => {
      const valid = () => assert.fail('The typeValidator has been run.');

      // will return true, so foo is required.
      const condition = props => props.hasOwnProperty('bar');

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(valid, condition)(props, propName, componentName);

      assert.ok(err instanceof Error);

      assert.end();
    }
  );

  nest.test(
    "...prop is required and present, so it validates against typeValidator",
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
});
