import test from 'tape';
import isRequiredIf from '../isRequiredIf';

test(
  "Prop is required because condition is a truthy value",
  assert => {
    const typeValidator = () => {
      assert.pass('The typeValidator has been run.');
      assert.end();
    };

    const props = { foo: 'x' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(typeValidator, props)(props, propName, componentName);
  }
);

test(
  "Prop is not required because condition is null",
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

test(
  "Prop is not required because condition is undefined",
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
