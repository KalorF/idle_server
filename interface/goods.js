const Router = require('koa-router')
const Goods = require('../dbs/models/goods')

const router = new Router({prefix: '/goods'})

router.post('/publishGoods', async (ctx) => {
  const { desc, price, typeName, goodsPics, seller, city } = ctx.request.body
  const cgoods = await Goods.create({ desc, price, typeName, goodsPics, seller, city })
  if (cgoods) {
    ctx.body = {
      code: 200,
      msg: '发布成功'
    }
  }
})

// 搜也获取商品列表
router.get('/goodsList', async (ctx) => {
  const city = ctx.query.city
  const data = await Goods.find({city}, {__v: 0}).populate('seller', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
  data.length ? ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  } : ctx.body = { code: 500, msg: 'city不能为空' }
})

// 通过搜索获取商品或者类型商品
router.get('/getGoodsListBykeyword', async (ctx) => {
  const { city, keyword } = ctx.query
  const reg = new RegExp(keyword, 'i')
  const result = await Goods.find({
    city,
    $or: [
      {desc: {$regex: reg}},
      {typeName: {$regex: reg}}
    ]
  }, { __v: 0}).populate('seller', {password: 0, createTime: 0, __v: 0, spareMoney: 0})
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: result
  }
})

// 获取搜索字段
router.get('/getSearchList', async (ctx) => {
  const { city, keyword } = ctx.query
  const reg = new RegExp(keyword, 'i')
  let data = []
  const result = await Goods.find({
    city,
    $or: [
      {desc: {$regex: reg}},
      {typeName: {$regex: reg}}
  ]},{desc: 1, typeName: 1, _id: 0})
  result.length && result.forEach(item => {
    let newdata = JSON.parse(JSON.stringify(item)) // 深拷贝对象
    Object.keys(newdata).forEach(ite => {
      if (newdata[ite].includes(keyword)) {
        !data.includes(item[ite]) && data.push(item[ite])
      }
    })
  })
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data
  }
})

module.exports = router