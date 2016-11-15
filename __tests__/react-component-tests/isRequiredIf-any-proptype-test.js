/* eslint-env mocha */
import assert from 'assert';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';
import React, { PropTypes } from 'react';
import isRequiredIf from '../../isRequiredIf';

const { any } = PropTypes;

describe('React component any proptype tests', () => {
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
    'validates against React any propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(any, false),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value />);
        },
        undefined,
      );
    },
  );

  it(
    '...prop is not required and missing, so it ' +
    'validates against React any propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(any, false),
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
        value: isRequiredIf(any, true),
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
    '...prop is required and present so it validates against the any',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(any, true),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value />);
        },
        undefined,
      );
    },
  );
});
