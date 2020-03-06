const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsSchema = new Schema({
  desc: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  typeName: {
    type: String,
    default: ''
  },
  goodsPics: {
    type: Array,
    default: []
  },
  city: {
    type: String,
    default: ''
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  },
  finishTime: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Goods', GoodsSchema)