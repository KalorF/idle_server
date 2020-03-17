const Router = require('koa-router')
const Reply = require('../dbs/models/reply')
const Comment = require('../dbs/models/comment')

const router = new Router({prefix: '/reply'})

// 添加评论回复
router.post('/addReply', async (ctx) => {
  const { comment, replyer, replyToSb, content, eotoes, replyId} = ctx.request.body
  if (Reply) {
    await Reply.updateOne({ _id: replyId }, {$set: {eotoes}})
    ctx.body = {
      code: 200,
      msg: '回复成功'
    }
    return
  } else {
    await Reply.create({ comment, replyer, replyToSb, content })
    ctx.body = {
      code: 200,
      msg: '回复成功'
    }
  }
})

// 查看评论回复
router.get('/viewCommentReply', async (ctx) => {
  const {commentId} = ctx.query
  let comment = JSON.parse(JSON.stringify(await Comment.findOne({_id: commentId}, {__v: 0}).populate('reviewer', {password: 0, createTime: 0, __v: 0, spareMoney: 0})))
  let replies = JSON.parse(JSON.stringify(await Reply.find({comment: commentId}, {__v: 0, replyToSb: 0}).populate('replyer', {password: 0, createTime: 0, __v: 0, spareMoney: 0}).sort({'_id': -1})))
  // for (let i = 0; i < replies.length; i++) {
  //   const myeotoes = await Reply.find({comment: undefined, replyToSb: replies[i].replyer}, {eotoes: 1})
  //   replies[i].myeotoes = myeotoes
  // }
  comment.replies = replies
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: comment
  }
})

module.exports = router