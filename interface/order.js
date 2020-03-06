const Router = require('koa-router')
const Order = require('../dbs/models/order')
const Goods = require('../dbs/models/goods')

const router = new Router({prefix: '/order'})

// 创建订单
router.post('/createOrder', async (ctx) => {
  const { goodsId, buyerId } = ctx.request.body
  const findOrder = await Order.findOne({goods: goodsId, buyer: buyerId})
  if (findOrder) {
    ctx.body = {
      code: 204,
      msg: '已下单，请勿重复下单'
    }
    return
  }
  const corder = await Order.create({goods: goodsId, buyer: buyerId})
  if (corder) {
    ctx.body = {
      code: 200,
      msg: '下单成功'
    }
  }
})

// 根据状态来获取我的订单
router.post('/myOrder', async (ctx) => {
  const { isReceive, buyer } = ctx.request.body
  let myOrder = JSON.parse(JSON.stringify(await Order.find({isReceive, buyer}, {__v: 0})))
  for (let i = 0; i < myOrder.length; i++) {
    const goods = await Goods.findOne({_id: myOrder[i].goods}).populate('seller', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
    myOrder[i].goods = goods
  }
  ctx.body = {
    code: 200,
    data: myOrder
  }
})

module.exports = router