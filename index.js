const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const dbConfig = require('./dbs/config')
const user = require('./interface/user')

const app = new Koa()

app.use(bodyParser({
  extendTypes:['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {useNewUrlParser:true, useUnifiedTopology: true})

app.use(user.routes()).use(user.allowedMethods())

app.listen(3000, () => {
  console.log('server listening in http://localhost:3000')
})