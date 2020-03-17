const Router = require('koa-router')
const User = require('../dbs/models/user')
const fs = require('fs')
let OSS = require('ali-oss')

let client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI4FsFdocr9jTT3oVBBzZW',
  accessKeySecret: 'NSQpM5SVNpNxGazxBW4fu2U0uMH3z5',
  bucket: 'idlepics',
});
const router = new Router({prefix: '/user'})

router.post('/signup', async (ctx) => {
  const { username, password, phone, wechat } = ctx.request.body
  try {
    const findPhone = await User.find({phone})
    if (findPhone.length) {
      ctx.body = {
        code: 205,
        msg: '用户已被注册',
        data: findPhone[0]
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

router.post('/login', async (ctx) => {
  const { phone, password } = ctx.request.body
  const findUser = await User.findOne({phone}, {__v: 0, createTime: 0})
  if (!findUser) {
    ctx.body = {
      code: 205,
      msg: '用户不存在'
    }
    return
  }
  if (findUser && password === findUser.password) {
    ctx.body = {
      code: 200,
      msg: '登陆成功',
      data: findUser
    }
    return
  }
  return ctx.body = {code: 206, msg: '密码错误'}
})

// 获取用户信息接口
router.post('/getUserInfo', async (ctx) => {
  const { userId } = ctx.request.body
  const user = await User.findOne({ _id: userId })
  ctx.body = {
    code: 200,
    data: user
  }
})

// 修改用户信息接口
router.post('/modifyUserInfo', async (ctx) => {
  const { userId, username, wechat, avatars } = ctx.request.body
  if (wechat) {
    await User.updateOne({ _id: userId }, {$set:{ username }})
  } else if (wechat) {
    await User.updateOne({ _id: userId }, {$set:{ wechat }})
  } else {
    await User.updateOne({ _id: userId }, {$set:{ avatars }})
  }
  ctx.body = {
    code: 200,
    msg: '修改成功'
  }
})

router.post('/modifyPwd', async (ctx) => {
  const { userId, originPwd, newPwd } = ctx.request.body
  const user = await User.findOne({ _id: userId, password: originPwd})
  if (!user) {
    ctx.body = {
      code: 204,
      msg: '原密码错误'
    }
    return
  }
  await User.updateOne({ _id: userId }, {$set: {password: newPwd}})
  ctx.body = {
    code: 200,
    msg: '修改成功'
  }
})

// 用户上传图片接口
router.post('/uploadPics', async (ctx) => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  const name = new Date().getTime() + file.name
  let result = await client.put(`idle/${name}`, reader)
  ctx.body = {
    code: 200,
    data: result
  }
})

module.exports = router