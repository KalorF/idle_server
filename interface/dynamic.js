const Router = require('koa-router')
const Dynamic = require('../dbs/models/dynamic')
const Comment = require('../dbs/models/comment')

const router = new Router({ prefix: '/dynamic' })

// 发布动态
router.post('/publishDynamic', async (ctx) => {
  const { publisher, pics, content, city } = ctx.request.body
  const dynamic = await Dynamic.create({publisher, pics, content, city})
  dynamic && (ctx.body = {
    code: 200,
    msg: '发布成功'
  })
})

// 获取动态
router.get('/getPublish', async (ctx) => {
  const { city } = ctx.query
  const publishes = await Dynamic.find({city}).populate('publisher', {password: 0, createTime: 0, __v: 0, spareMoney: 0}).sort({'_id':-1})
  publishes.length && (ctx.body = {
    code: 200,
    msg: '获取成功',
    data: publishes
  })
})

// 查看动态品论
router.get('/viewDymCom', async (ctx) => {
  const { dynamicId } = ctx.query
  let dynamic = JSON.parse(JSON.stringify(await Dynamic.findOne({ _id: dynamicId }, {__v: 0})))
  const comments = await Comment.find({ comment: dynamicId }).sort({'_id': -1}).populate('reviewer', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
  dynamic.comments = comments
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: dynamic
  }
})

module.exports = router