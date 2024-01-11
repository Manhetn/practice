import { ERROR_MESSAGES } from '../constants';
import { IValidationResult } from '../interfaces';

const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;

const checkNotEmptyField = (value: string): boolean => {
  return value.trim() !== '';
};

const validateEmailNotEmpty = (value: string): IValidationResult => {
  if (checkNotEmptyField(value)) {
    return {
      isValid: true,
      error: null,
    };
  }

  return {
    isValid: false,
    error: ERROR_MESSAGES.email.empty,
  };
};

const validateEmailFormat = (value: string): IValidationResult => {
  if (regexEmail.test(value)) {
    return {
      isValid: true,
      error: null,
    };
  }

  return {
    isValid: false,
    error: ERROR_MESSAGES.email.notFormat,
  };
};

const validateEmail = (value: string): IValidationResult => {
  const notEmptyResult = validateEmailNotEmpty(value);
  if (!notEmptyResult.isValid) {
    return notEmptyResult;
  }

  const formatResult = validateEmailFormat(value);
  if (!formatResult.isValid) {
    return formatResult;
  }

  return {
    isValid: true,
    error: null,
  };
};

const ValidationService = {
  validateEmailNotEmpty,
  validateEmailFormat,
  checkNotEmptyField,
  validateEmail,
};

export default ValidationService;
