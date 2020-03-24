const Koa = require('koa')
const mongoose = require('mongoose')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const json = require('koa-json')
const cors = require('koa2-cors')
const dbConfig = require('./dbs/config')
const user = require('./interface/user')
const type = require('./interface/type')
const goods = require('./interface/goods')
const order = require('./interface/order')
const dynamic = require('./interface/dynamic')
const comment = require('./interface/comment')
const reply = require('./interface/reply')
const forgoods = require('./interface/forgoods')
const forgoosOrder = require('./interface/forgoosOrder')
const message = require('./interface/message')

const app = new Koa()

// app.use(bodyParser({
//   extendTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 700 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(json())
app.use(cors())

mongoose.connect(dbConfig.dbs, {useNewUrlParser:true, useUnifiedTopology: true})

app.use(user.routes()).use(user.allowedMethods())
app.use(type.routes()).use(type.allowedMethods())
app.use(goods.routes()).use(goods.allowedMethods())
app.use(order.routes()).use(order.allowedMethods())
app.use(dynamic.routes()).use(dynamic.allowedMethods())
app.use(comment.routes()).use(comment.allowedMethods())
app.use(reply.routes()).use(reply.allowedMethods())
app.use(forgoods.routes()).use(forgoods.allowedMethods())
app.use(forgoosOrder.routes()).use(forgoosOrder.allowedMethods())
app.use(message.routes()).use(message.allowedMethods())

app.listen(3000, () => {
  console.log('server listening in http://localhost:3000')
})