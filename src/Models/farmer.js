const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * @description farmer schema
 */
const FarmerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  FarmerName: {
    type: String,
    required: true
  },
  FarmerDescription: {
    type: String,
    required: true
  },

  FarmerAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = model('farmers', FarmerSchema);
