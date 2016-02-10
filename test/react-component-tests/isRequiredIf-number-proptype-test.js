import test from 'tape';
import isRequiredIf from '../../isRequiredIf';
import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';



const { number } = PropTypes;

const setup = () => {
  const fixtures = {};

  fixtures.renderer = createRenderer();
  fixtures.Component = props => <div>Hello {props.value}</div>;
  fixtures.sandbox = sandbox.create();
  fixtures.warn = fixtures.sandbox.stub(console, "error").throws();

  return fixtures;
};

const teardown = fixtures => {
  fixtures.sandbox.restore();

  fixtures = {};
};

test('React component number proptype tests', nest => {
  nest.test(
    "...prop is not required and present, so it " +
    "validates against React number propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(number, false)
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={42} />);
        },
        undefined,
        'No warning was issued.'
      );

      teardown(fixtures);

      assert.end();
    }
  );

  nest.test(
    "...prop is not required and missing, so it " +
    "validates against React number propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(number, false)
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component />);
        },
        undefined,
        'No warning was issued.'
      );

      teardown(fixtures);

      assert.end();
    }
  );

  nest.test(
    "...prop is required and warns because it is missing",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(number, true)
      };

      assert.throws(
        () => {
          renderer.render(<Component />);
        },
        Error,
        'Throws because required prop is missing.'
      );

      teardown(fixtures);

      assert.end();
    }
  );

  nest.test(
    "...prop is required and present so it validates against the number",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(number, true)
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={42} />);
        },
        undefined,
        'No warning was issued.'
      );

      teardown(fixtures);

      assert.end();
    }
  );
});
