const Router = require('koa-router')
const ForgoodsOrder = require('../dbs/models/forgoodsOrder')
const User = require('../dbs/models/user')

const router = new Router({prefix: '/forgoodsorder'})

// 增加兑换商品订单
router.post('/addForgoosOrder', async (ctx) => {
  const { forgoodsId, cost, userId, phone, address, goodsAre } = ctx.request.body
  await User.updateOne({ _id: userId }, {$inc: {spareMoney: cost* -1}})
  await ForgoodsOrder.create({ forgoods: forgoodsId, phone, address, goodsAre, user: userId })
  ctx.body = {
    code: 200,
    msg: '兑换成功'
  }
})

// 获取兑换商品订单
router.get('/forgoodsList', async (ctx) => {
  const data = await ForgoodsOrder.find({}).populate('forgoods').populate('user', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  }
})

module.exports = router