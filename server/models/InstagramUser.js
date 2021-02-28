const { Schema, model } = require('mongoose')

const schema = new Schema({
  type: { type: String, default: 'user' },
  image: { type: String, required: true },
  username: { type: String, required: true },
})

module.exports = model('InstagramUser', schema)
