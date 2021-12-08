const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8 }
})


personSchema.plugin(uniqueValidator)
personSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
personSchema.set('toJSON', { virtuals: true })
module.exports = mongoose.model('Person', personSchema)