import test from 'tape';
import isRequiredIf from '../../isRequiredIf';
import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';



const { array } = PropTypes;

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

test('React component array proptype tests', nest => {
  nest.test(
    "...prop is not required and present, so it " +
    "validates against React array propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(array, false)
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={[ 1, 2, 3 ]} />);
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
    "validates against React array propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(array, false)
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
        value: isRequiredIf(array, true)
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
    "...prop is required and present so it validates against the array",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(array, true)
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={[ 1, 2, 3 ]} />);
        },
        undefined,
        'No warning was issued.'
      );

      teardown(fixtures);

      assert.end();
    }
  );
});
