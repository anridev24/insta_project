const { Schema, model } = require('mongoose')

const schema = new Schema({
  type: { type: String, default: 'hashtag' },
  image: { type: String, required: true },
  name: { type: String, required: true },
  mediaCount: { type: Number, required: true },
})

module.exports = model('InstagramUser', schema)
