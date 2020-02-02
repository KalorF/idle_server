const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  phone: {
    type: String,
    unique: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatars: {
    type: String,
    default: ''
  },
  wechat: {
    type: String,
    require: true
  },
  spareMoney: {
    type: Number,
    default: 0
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  }
})

module.exports = mongoose.model('User', UserSchema)