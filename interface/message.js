const Router = require('koa-router')
const Message = require('../dbs/models/message')

const router = new Router({prefix: '/message'})

// 根据状态获取消息
router.get('/getMsgData', async (ctx) => {
  const { msgType, acceptor } = ctx.query
  const data = await Message.find({ msgType, acceptor, isDel: 0 }).sort({ '_id': -1 })
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  }
})

// 标记消息已读
router.post('/viewMsgData', async (ctx) => {
  const { id } = ctx.request.body
  await Message.updateOne({ _id: id }, {$set: {isRead: 1}})
  ctx.body = {
    code: 200,
    msg: '操作成功'
  }
})

// 删除消息
router.post('/delMsg', async (ctx) => {
  const { id } = ctx.request.body
  await Message.updateOne({ _id: id }, {$set:{isDel: 1}})
  ctx.body = {
    code: 200,
    msg: '删除成功'
  }
})

module.exports = router
