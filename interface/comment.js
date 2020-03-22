const Router = require('koa-router')
const Comment = require('../dbs/models/comment')
const Dynamic = require('../dbs/models/dynamic')
const User = require('../dbs/models/user')
const Messgae = require('../dbs/models/message')

const router = new Router({ prefix: '/comment' })

// 添加评论
router.post('/addComment', async (ctx) => {
  const { content, dynamic, reviewer } = ctx.request.body
  const dymContent = await Dynamic.findOne({ _id: dynamic })
  if (dymContent.publisher != reviewer) {
    const rev = await User.findOne({ _id: reviewer }, {password: 0, createTime: 0, __v: 0, spareMoney: 0})
    const content = { dymContent, rev }
    await Messgae.create({ content, acceptor: dymContent.publisher, msgType: 1 })
  }
  await Comment.create({ content, dynamic, reviewer })
  ctx.body = {
    code: 200,
    msg: '评论成功'
  }
})

// 点赞评论
router.post('/giveLike', async (ctx) => {
  const { commentId, status } = ctx.request.body
  await Comment.updateOne({_id: commentId}, {$inc: {linkeNum: status == 1 ? 1 : -1}})
  ctx.body = {
    code: 200,
    msg: '操作成功'
  }
})

module.exports = router