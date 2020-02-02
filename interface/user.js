const Router = require('koa-router')
const User = require('../dbs/models/user')

const router = new Router({prefix: '/user'})

router.post('/signup', async (ctx) => {
  const { username, password, phone, wechat } = ctx.request.body
  try {
    const findPhone = await User.find({phone})
    if (findPhone.length) {
      ctx.body = {
        code: 205,
        msg: '用户已被注册',
        id: findPhone[0]
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: error
    }
  }
  
  const cuser = await User.create({username, password, phone, wechat})
  if (cuser) {
    ctx.body = {
      code: 200,
      msg: '注册成功',
      ...ctx.request.body
    }
    return
  }
})

module.exports = router