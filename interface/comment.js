const Router = require('koa-router')
const Comment = require('../dbs/models/comment')

const router = new Router({ prefix: '/comment' })

// 添加品论
router.post('/addComment', async (ctx) => {
  const { content, comment, reviewer } = ctx.request.body
  await Comment.create({ content, comment, reviewer })
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