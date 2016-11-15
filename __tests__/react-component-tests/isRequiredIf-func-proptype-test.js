/* eslint-env mocha */
import assert from 'assert';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';
import React, { PropTypes } from 'react';
import isRequiredIf from '../../isRequiredIf';

const { func } = PropTypes;

describe('React component func proptype tests', () => {
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
    'validates against React func propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(func, false),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={() => null} />);
        },
        undefined,
      );
    },
  );

  it(
    '...prop is not required and missing, so it ' +
    'validates against React func propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(func, false),
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
        value: isRequiredIf(func, true),
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
    '...prop is required and present so it validates against the func',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(func, true),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value={() => null} />);
        },
        undefined,
      );
    },
  );
});
