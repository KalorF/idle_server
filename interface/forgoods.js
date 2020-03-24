const Router = require('koa-router')
const Forgoods = require('../dbs/models/forgoods')

const router = new Router({prefix: '/forgoods'})

// 添加兑换商品
router.post('/addgoods', async (ctx) => {
  const { title, pics, cost } = ctx.request.body
  await Forgoods.create({ title, pics, cost })
  ctx.body = {
    code: 200,
    msg: '添加成功'
  }
})

router.post('/upStatus', async (ctx) => {
  const { id, status } = ctx.request.body
  await Forgoods.updateOne({ _id: id}, {$set: { status }})
  ctx.body = {
    code: 200,
    msg: '成功'
  }
})

// 获取兑换商品列表
router.get('/getForgoods', async (ctx) => {
  const { status } = ctx.query
  const data = status ? await Forgoods.find({ status: 1 }) : await Forgoods.find({})
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  }
})

module.exports = router