'use strict';

var react = require('react');

var propIsRequired = function propIsRequired(condition, props, propName, componentName) {
  if (Boolean(condition)) {
    if (typeof condition === 'boolean') {
      return condition;
    } else if (typeof condition === 'function') {
      return condition(props, propName, componentName);
    }
  }

  return false;
};

var isCustomReactPropType = function isCustomReactPropType(validator) {
  return Object.keys(react.PropTypes).every(function (propType) {
    return react.PropTypes[propType] !== validator;
  });
};

var propExists = function propExists(props, propName, componentName) {
  if (!props.hasOwnProperty(propName) || !Boolean(props[propName])) {
    return new Error('Warning: Failed propType: Required ' + props[propName] + ' `' + propName + '`' + (' was not specified in `' + componentName + '`.'));
  }

  return true;
};

var isRequiredIf = function isRequiredIf(validator, condition) {
  return function (props, propName, componentName) {
    if (propIsRequired(condition, props, propName, componentName)) {
      if (isCustomReactPropType(validator)) {
        var exists = propExists(props, propName, componentName);
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
};

module.exports = isRequiredIf;