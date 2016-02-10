import test from 'tape';
import isRequiredIf from '../../isRequiredIf';
import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { spy } from 'sinon';



const { bool } = PropTypes;

const setup = () => {
  const fixtures = {};

  fixtures.renderer = createRenderer();
  fixtures.Component = props => <div>Hello {props.value}</div>;
  fixtures.warn = spy(console, "error");

  return fixtures;
};

const teardown = fixtures => {
  fixtures.warn.restore();

  fixtures = {};

  return fixtures;
};

test('React component bool proptype tests', nest => {
  nest.test(
    "...prop is not required and present, so it " +
    "validates against React bool propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component,
        warn
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(bool, false)
      };

      renderer.render(<Component value={true} />);

      assert.false(
        warn.called,
        'No warning was issued.'
      );

      assert.equals(
        warn.args.length,
        0,
        'Warn was called with no args.'
      );

      teardown(fixtures);

      assert.end();
    }
  );

  nest.test(
    "...prop is not required and missing, so it " +
    "validates against React bool propType",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component,
        warn
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(bool, false)
      };

      renderer.render(<Component />);

      assert.false(
        warn.called,
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
        Component,
        warn
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(bool, true)
      };

      renderer.render(<Component />);

      assert.ok(
        warn.called,
        'Warning was issued because required prop was missing.'
      );

      teardown(fixtures);

      assert.end();
    }
  );

  nest.test(
    "...prop is required and present so it validates against the bool",
    assert => {
      const fixtures = setup();
      const {
        renderer,
        Component,
        warn
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(bool, true)
      };

      renderer.render(<Component value={true} />);

      assert.false(
        warn.called,
        'No warning was issued.'
      );

      teardown(fixtures);

      assert.end();
    }
  );
});
