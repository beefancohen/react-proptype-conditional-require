import test from 'tape';
import isRequiredIf from '../../isRequiredIf';
import { PropTypes } from 'react';

const { string } = PropTypes;

test('Boolean conditional tests', nest => {
  nest.test(
    "...prop is not required and validates against typeValidator",
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

  nest.test(
    "...prop is not required, so it validates against React typeValidator",
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

  nest.test(
    "...prop is required and returns error because it is missing",
    assert => {
      const typeValidator =
        () => assert.fail('The typeValidator has been run.');

      const props = {};
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(typeValidator, true)(props, propName, componentName);

      assert.ok(err instanceof Error);

      assert.end();
    }
  );

  nest.test(
    "...prop is required and present so it validates against the typeValidator",
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

});
