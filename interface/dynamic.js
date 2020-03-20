const Router = require('koa-router')
const Dynamic = require('../dbs/models/dynamic')
const Comment = require('../dbs/models/comment')
const Reply = require('../dbs/models/reply')

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
  let newarr = JSON.parse(JSON.stringify(publishes))
  for (let index = 0; index < newarr.length; index++) {
    const commentNub = await Comment.find({ dynamic: newarr[index]._id })
    newarr[index].commentNub = commentNub.length
  }
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: newarr
  }
})

// 查看动态评论
router.get('/viewDymCom', async (ctx) => {
  const { dynamicId } = ctx.query
  let dynamic = JSON.parse(JSON.stringify(await Dynamic.findOne({ _id: dynamicId }, {__v: 0}).populate('publisher', {password: 0, createTime: 0, __v: 0, spareMoney: 0})))
  const comments = await Comment.find({ dynamic: dynamicId }).sort({'_id': -1}).populate('reviewer', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
  dynamic.comments = JSON.parse(JSON.stringify(comments))
  for (let i = 0; i < dynamic.comments.length; i++) {
    const eotoes = await Reply.find({comment: dynamic.comments[i]._id}, {__v: 0, replyToSb: 0})
    dynamic.comments[i].eotoes = eotoes.length
  }
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: dynamic
  }
})

// 获取我的动态
router.get('/viewMyDym', async (ctx) => {
  const { userId } = ctx.query
  const dyms = await Dynamic.find({publisher: userId})
  let newarr = JSON.parse(JSON.stringify(dyms))
  for (let index = 0; index < newarr.length; index++) {
    const commentNub = await Comment.find({ dynamic: newarr[index]._id })
    newarr[index].commentNub = commentNub.length
  }
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: newarr
  }
})

module.exports = router