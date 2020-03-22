const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: {
    type: Object,
    default: null
  },
  acceptor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  msgType: {
    type: Number,
    default: 0
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  },
  isRead: {
    type: Number,
    default: 0
  },
  isDel: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Message', MessageSchema)
