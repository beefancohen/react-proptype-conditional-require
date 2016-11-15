/* eslint-env mocha */
import assert from 'assert';
import { createRenderer } from 'react-addons-test-utils';
import { sandbox } from 'sinon';
import React, { PropTypes } from 'react';
import isRequiredIf from '../../isRequiredIf';

const { string } = PropTypes;

describe('React component string proptype tests', () => {
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
    'validates against React string propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(string, false),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value="World" />);
        },
        undefined,
      );
    },
  );

  it(
    '...prop is not required and missing, so it ' +
    'validates against React string propType',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(string, false),
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
        value: isRequiredIf(string, true),
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
    '...prop is required and present so it validates against the string',
    () => {
      const {
        renderer,
        Component,
      } = fixtures;

      Component.propTypes = {
        value: isRequiredIf(string, true),
      };

      assert.doesNotThrow(
        () => {
          renderer.render(<Component value="World" />);
        },
        undefined,
      );
    },
  );
});
