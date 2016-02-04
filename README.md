# react-proptype-conditional-require

Conditionally require propTypes based on other props and variables.

# getting started

```
$ npm install --save react-proptype-conditional-require
```

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

# usage

This is a function that accepts a propType and a condition in which to enforce this propType for React components. The function uses the signature:

```js
import isRequiredIf from 'react-proptype-conditional-require';

isRequiredIf(validator, conditional)
```

## validator
A function that takes the arguments (props, propName, componentName) and returns an Error object if the validation fails. Do not `console.warn` or `throw`.
  - props - An object containing all of the props passed to the instance.
  - propName - The current key of the prop object under validation.
  - componentName - The class of the React component.

** All of the React built-in proptypes use this signature and you will usually use them to specify the validator**:

```js
import React, { PropTypes } from 'react';
import isRequiredIf from 'react-proptype-conditional-require';

const { string, bool } = PropTypes;

...

Component.propTypes = {
  first: isRequiredIf(string, true),
  second: isRequiredIf(bool, false)
}

...
```

## conditional
A boolean *or* function that returns a truthy value that indicates whether the prop is required or not. The function follows the same signature as the validator function: (props, propName, componentName). It should return a boolean, but any truthy value will do.

A common use case:

```js
import React, { PropTypes } from 'react';
import isRequiredIf from 'react-proptype-conditional-require';

const { string } = PropTypes;

...

Component.propTypes = {
  label: string,
  labelClassName: isRequiredIf(string, props => props.hasOwnProperty('label'));
}

...
```

In that case, the labelClassName will only be required if label is passed.

# license
MIT