const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  goods: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goods'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isReceive: {
    type: Number,
    default: 0
  },
  createTime: {
    type: String,
    default: new Date().getTime()
  }
})

module.exports = mongoose.model('Order', OrderSchema)