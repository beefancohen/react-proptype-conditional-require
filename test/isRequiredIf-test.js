import test from 'tape';
import isRequiredIf from '../isRequiredIf';

test(
  'It is not required, so it just validates against the validator', assert => {
    const validator = () => {
      assert.pass('The validator has been run.');
      assert.end();
    };

    isRequiredIf(validator, false)();
  }
);
