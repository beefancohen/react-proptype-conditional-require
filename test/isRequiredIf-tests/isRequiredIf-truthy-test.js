import test from 'tape';
import isRequiredIf from '../../isRequiredIf';


test('Truthy conditional tests', nest => {
  nest.test(
    "...when condition is null, " +
    "prop is not required and validates against typeValidator",
    assert => {
      const typeValidator = () => {
        assert.pass('The typeValidator has been run.');
        assert.end();
      };

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, null)(props, propName, componentName);
    }
  );

  nest.test(
    "...when condition is undefined, " +
    "prop is not required and validates against typeValidator",
    assert => {
      const typeValidator = () => {
        assert.pass('The typeValidator has been run.');
        assert.end();
      };

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, undefined)(props, propName, componentName);
    }
  );

  nest.test(
    "...when condition is truthy, " +
    "prop is required and returns error because it is missing",
    assert => {
      const valid = () => assert.fail('The typeValidator has been run.');

      const props = { bar: 'x' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      const err =
        isRequiredIf(valid, props)(props, propName, componentName);

      assert.ok(err instanceof Error);

      assert.end();
    }
  );

  nest.test(
    "...when condition is truthy, " +
    "prop is required and present, so it validates against typeValidator",
    assert => {
      const typeValidator = () => {
        assert.pass('The typeValidator has been run.');
        assert.end();
      };

      const props = { foo: 'abc' };
      const propName = 'foo';
      const componentName = 'FooComponent';

      isRequiredIf(typeValidator, props)(props, propName, componentName);
    }
  );
});

