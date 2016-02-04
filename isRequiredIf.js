'use strict';

import { PropTypes } from 'react';


const propIsRequired = (condition, props, propName, componentName) => {
  if (Boolean(condition)) {
    if (typeof condition === 'boolean') {
      return condition;
    } else if (typeof condition === 'function') {
      return condition(props, propName, componentName);
    }
  }

  return false;
};

const isCustomReactPropType = validator =>
    Object.keys(PropTypes).every(propType => PropTypes[propType] !== validator);

const propExists = (props, propName, componentName) => {
  if (!props.hasOwnProperty(propName) || !Boolean(props[propName])) {
    return new Error(
      `Warning: Failed propType: Required ${props[propName]} \`${propName}\`` +
      ` was not specified in \`${componentName}\`.`
    );
  }

  return true;
};

const isRequiredIf = (validator, condition) =>
  (props, propName, componentName) => {
    if (propIsRequired(condition, props, propName, componentName)) {
      if (isCustomReactPropType(validator)) {
        const exists = propExists(props, propName, componentName);
        if (exists instanceof Error) {
          return exists;
        }

        return validator(props, propName, componentName);
      }
      return validator.isRequired(props, propName, componentName);
    }

    // Is not required, so just run validator.
    return validator(props, propName, componentName);
  };

export default isRequiredIf;
