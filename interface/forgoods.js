const Router = require('koa-router')
const Forgoods = require('../dbs/models/forgoods')

const router = new Router({prefix: '/forgoods'})

router.post('/addgoods', async (ctx) => {
  const { title, pics, cost } = ctx.request.body
  await Forgoods.create({ title, pics, cost })
  ctx.body = {
    code: 200,
    msg: '添加成功'
  }
})

router.get('/getForgoods', async (ctx) => {
  const data = await Forgoods.find({})
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  }
})

module.exports = router