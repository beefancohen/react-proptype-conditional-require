# react-proptype-conditional-require

Conditionally require propTypes based on other props and variables.

# example

``` js
import React, { PropTypes } from 'react';
import isRequiredIf from 'react-proptype-conditional-require';

const Hello = props => <div className={props.className}>Hello {props.value}!</div>;

Hello.defaultProps = {
  value: 'World'
};

const { string } = PropTypes;

Hello.propTypes = {
  value: string
  className: isRequiredIf(string, (props, propName, componentName) => props.hasOwnProperty('value'))
};
```