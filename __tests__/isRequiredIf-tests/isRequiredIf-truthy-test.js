/* eslint-env mocha */
import assert from 'assert';
import isRequiredIf from '../../isRequiredIf';

describe('Truthy conditional tests', () => {
  it(
    '...when condition is null, ' +
    'prop is not required and validates against typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, null)(props, propName, componentName);
    },
  );

  it(
    '...when condition is undefined, ' +
    'prop is not required and validates against typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, undefined)(props, propName, componentName);
    },
  );

  it(
    '...when condition is truthy, ' +
    'prop is required and returns error because it is missing',
    () => {
      const valid = () => assert.fail('The typeValidator has been run.');

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(valid, props)(props, propName, componentName);

      assert(
        err instanceof Error,
        'Returns an error because required prop is missing',
      );
    },
  );

  it(
    '...when condition is truthy, ' +
    'prop is required and present, so it validates against typeValidator',
    () => {
      const typeValidator = () => {
        assert('The typeValidator has been run.');
      };

      const props = { foo: 'abc' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, props)(props, propName, componentName);
    },
  );
});
