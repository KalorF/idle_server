const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  parentId: {
    type: String,
    default: ''
  },
  pic: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Type', TypeSchema)