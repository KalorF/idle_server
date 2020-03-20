const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ForgoodsSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  pics: {
    type: Array,
    default: []
  },
  cost: {
    type: Number,
    default: 0
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  }
})


module.exports = mongoose.model('Forgoods', ForgoodsSchema)