const Validator = require('validator');
const isEmpty = require('./is-Empty');

const agentInputValidation = (data) => {
  const errors = {};

  data.CompanyName = !isEmpty(data.CompanyName) ? data.CompanyName : '';
  data.CompanyDescription = !isEmpty(data.CompanyDescription) ? data.CompanyDescription : '';
  data.CompanyAddress = !isEmpty(data.CompanyAddress) ? data.CompanyAddress : '';


  if (!Validator.isEmpty(data.CompanyName, { min: 2, max: 200 })) {
    errors.CompanyName = 'name must be between 2 and 50 character';
  }

  if (Validator.isEmpty(data.CompanyName)) {
    errors.CompanyName = 'Company name filed is reqired';
  }

  if (!Validator.isEmpty(data.CompanyDescription)) {
    errors.CompanyDescription = 'company is description is important';
  }

  if (Validator.isEmpty(data.CompanyDescription)) {
    errors.CompanyDescription = 'company description filed is reqired';
  }

  if (!Validator.isEmpty(data.CompanyAddress, { min: 6, max: 200 })) {
    errors.CompanyAddress = 'Comapny Address is required';
  }
  if (Validator.isEmpty(data.CompanyAddress)) {
    errors.CompanyAddress = 'Company Address is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = agentInputValidation;
