const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ForgoodsOrderSchema = new Schema({
  forgoods: {
    type: Schema.Types.ObjectId,
    ref: 'Forgoods'
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  },
  goodsAre: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('ForgoodsOrder', ForgoodsOrderSchema)
