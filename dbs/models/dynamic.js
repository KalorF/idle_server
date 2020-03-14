const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DynamicSchme = new Schema({
  content: {
    type: String,
    default: ''
  },
  pics: {
    type: Array,
    default: []
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  city: {
    type: String,
    default: ''
  },
  likeNum: {
    type: Number,
    default: 0
  },
  creteTime: {
    type: String,
    default: new Date().getTime()
  }
})

module.exports = mongoose.model('Dynamic', DynamicSchme)