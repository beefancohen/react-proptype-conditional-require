import test from 'tape';
import isRequiredIf from '../isRequiredIf';

test(
  "Prop is required because condition is a truthy value",
  assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    const props = { foo: 'x' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(validator, props)(props, propName, componentName);
  }
);

test(
  "Prop is not required because condition is null",
  assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    const props = { bar: 'x' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(validator, null)(props, propName, componentName);
  }
);

test(
  "Prop is not required because condition is undefined",
  assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    const props = { bar: 'x' };
    const propName = 'foo';
    const componentName = 'FooComponent';

    isRequiredIf(validator, undefined)(props, propName, componentName);
  }
);
