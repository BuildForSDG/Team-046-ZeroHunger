const Validator = require('validator');
const isEmpty = require('./is-Empty');

const farmerInputValidation = (data) => {
  const errors = {};

  data.FarmerName = !isEmpty(data.FarmerName) ? data.FarmerName : '';
  data.FarmerDescription = !isEmpty(data.FarmerDescription) ? data.FarmerDescription : '';
  data.FarmerAddress = !isEmpty(data.FarmerAddress) ? data.FarmerAddress : '';


  if (!Validator.isEmpty(data.FarmerName, { min: 2, max: 200 })) {
    errors.FarmerName = 'name must be between 2 and 50 character';
  }

  if (Validator.isEmpty(data.FarmerName)) {
    errors.FarmerName = 'Farmer name filed is reqired';
  }

  if (!Validator.isEmpty(data.FarmerDescription)) {
    errors.FarmerDescription = 'Farmer description is important';
  }

  if (Validator.isEmpty(data.FarmerDescription)) {
    errors.FarmerDescription = 'Farmer description filed is reqired';
  }

  if (!Validator.isEmpty(data.FarmerAddress, { min: 6, max: 200 })) {
    errors.FarmerAddress = 'Farmer Address is required';
  }
  if (Validator.isEmpty(data.FarmerAddress)) {
    errors.FarmerAddress = 'Farmer Address is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = farmerInputValidation;
