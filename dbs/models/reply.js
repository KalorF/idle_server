const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema({
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  replyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  replyToSb: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    default: ''
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  },
  eotoes: {
    type: Object,
    default: null
  }
})


module.exports = mongoose.model('Reply', ReplySchema)