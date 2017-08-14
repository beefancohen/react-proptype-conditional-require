/* eslint-env mocha */
import assert from 'assert';
import PropTypes from 'prop-types';
import isRequiredIf from '../../isRequiredIf';

const { string } = PropTypes;

describe('Function conditional tests', () => {
  it(
    '...prop is not required and validates against custom typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      // will return false, so foo is not required.
      const condition = props => Object.hasOwnProperty.call(props, 'bar');

      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, condition)(props, propName, componentName);
    },
  );

  it(
    '...prop is not required and validates against React typeValidator',
    () => {
      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      const valid =
        isRequiredIf(string, () => false)(props, propName, componentName);

      assert.equal(
        valid,
        null,
        'The typeValidator returns null because it is not required.',
      );
    },
  );

  it(
    '...prop is required and returns error because it is missing',
    () => {
      const valid = () => assert.fail('The typeValidator has been run.');

      // will return true, so foo is required.
      const condition = props => Object.hasOwnProperty.call(props, 'bar');

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(valid, condition)(props, propName, componentName);

      assert(
        err instanceof Error,
        'Returns an error because required prop is missing',
      );
    },
  );

  it(
    '...prop is required and present, so it validates against typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator is run.');
      };

      // will return true, so foo is required.
      const condition = props => Object.hasOwnProperty.call(props, 'bar');

      const props = { bar: 'x', foo: 'y' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, condition)(props, propName, componentName);
    },
  );
});
