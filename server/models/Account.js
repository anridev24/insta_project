const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, requuired: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  savedUsers: {
    type: Array,
    default: [],
  },
  savedHashtags: { type: Array, default: [] },
})

module.exports = model('Account', schema)
