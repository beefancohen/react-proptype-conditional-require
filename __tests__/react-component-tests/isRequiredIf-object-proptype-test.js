/* eslint-env mocha */
import assert from 'assert';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';
import React, { PropTypes } from 'react';
import isRequiredIf from '../../isRequiredIf';

const { object } = PropTypes;

describe('React component object proptype tests', () => {
  let fixtures = {};

  beforeEach(() => {
    fixtures.renderer = createRenderer();
    fixtures.Component = props => <div>Hello {props.value}</div>; // eslint-disable-line
    fixtures.sandbox = sandbox.create();
    fixtures.warn = fixtures.sandbox.stub(console, 'error').throws();
  });

  afterEach(() => {
    fixtures.sandbox.restore();
    fixtures = {};
  });

  it(
    '...prop is not required and present, so it ' +
    'validates against React object propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(object, false),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={{ foo: 42 }} />);
        },
        undefined,
      );
    },
  );

  it(
    '...prop is not required and missing, so it ' +
    'validates against React object propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(object, false),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component />);
        },
        undefined,
      );
    },
  );

  it(
    '...prop is required and warns because it is missing',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(object, true),
      };

      assert.throws(
        () => {
          renderer.render(<Component />);
        },
        Error,
        'Throws because required prop is missing.',
      );
    },
  );

  it(
    '...prop is required and present so it validates against the object',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(object, true),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={{ foo: 42 }} />);
        },
        undefined,
      );
    },
  );
});
