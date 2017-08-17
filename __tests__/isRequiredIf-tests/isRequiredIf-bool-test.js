/* eslint-env mocha */
import assert from 'assert';
import PropTypes from 'prop-types';
import isRequiredIf from '../../isRequiredIf';

const { string } = PropTypes;

describe('Boolean conditional tests', () => {
  it(
    '...prop is not required and validates against typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, false)(props, propName, componentName);
    },
  );

  it(
    '...prop is not required, so it validates against React typeValidator',
    () => {
      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      const valid =
        isRequiredIf(string, false)(props, propName, componentName);

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
      const typeValidator =
        () => assert.fail('The typeValidator has been run.');

      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(typeValidator, true)(props, propName, componentName);

      assert(
        err instanceof Error,
        'Returns an error because required prop is missing',
      );
    },
  );

  it(
    '...prop is required and present so it validates against the typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      const props = { foo: 'abc' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, true)(props, propName, componentName);
    },
  );
});
