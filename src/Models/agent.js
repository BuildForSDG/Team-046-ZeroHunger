const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * @description agent schema
 */
const AgentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  CompanyName: {
    type: String,
    required: true
  },
  CompanyDescription: {
    type: String,
    required: true
  },

  CompanyAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = model('agents', AgentSchema);
