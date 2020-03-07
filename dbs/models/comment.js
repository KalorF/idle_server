const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: {
    type: String,
    default: ''
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Dynamic'
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  linkeNum: {
    type: Number,
    default: 0
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  }
})

module.exports = mongoose.model('Comment', CommentSchema)