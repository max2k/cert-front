import { lengthValidator, numericRangeValidator } from '../../utils/helpers';

const validators = {
  name: {
    validate: (input) => lengthValidator(input, 6, 30),
    errorMessage: 'Description lenght shoud be between 6 and 30 chars',
  },
  description: {
    validate: (input) => lengthValidator(input, 12, 1000),
    errorMessage: 'Description lenght shoud be between 12 and 1000 chars',
  },
  duration: {
    validate: (input) => numericRangeValidator(input, 0, 10000),
    errorMessage:
      'Duration should be positive numeric and more than 0 and less than 10000',
  },
  price: {
    validate: (input) => numericRangeValidator(input, 0.01, 10000),
    errorMessage:
      'Price should be positive numeric and more than 0 and less than 10000',
  },
};

export function validateInput(target) {
  const { value, name } = target;
  return validators[name].validate(value);
}

export function newErrorState(name, errorState) {
  return { ...errorState, [name]: validators[name].errorMessage };
}
