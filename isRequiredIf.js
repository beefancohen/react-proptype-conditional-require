'use strict';

import { PropTypes } from 'react';


const isRequired = (condition, ...propsArgs) => {
  if (Boolean(condition)) {
    if (typeof condition === 'boolean') {
      return condition;
    } else if (typeof condition === 'function') {
      return condition(...propsArgs);
    }
  }

  return false;
};

const isCustomReactPropType = validator =>
  Object.keys(PropTypes).some(propType => PropTypes[propType] !== validator);

const existsAndIsValid = (validator, props, propName, componentName) => {
  if (props.hasOwnProperty(propName) && Boolean(props[propName])) {
    return validator(props, propName, componentName);
  }

  return new Error(
    `Warning: Failed propType: Required ${props[propName]} \`${propName}\`
    was not specified in \`${componentName}\`.`
  );
};

const isRequiredIf = (validator, condition) =>
  (props, propName, componentName) => {
    if (isRequired(condition, props, propName, componentName)) {
      if (isCustomReactPropType(validator)) {
        return existsAndIsValid(validator, props, propName, componentName);
      }

      return validator.isRequired(props, propName, componentName);
    }

    // Is not required, so just run validator.
    return validator(props, propName, componentName);
  };

export default isRequiredIf;
