const Router = require('koa-router')
const Type = require('../dbs/models/type')

const router = new Router({prefix: '/type'})

// 添加父类型
router.post('/addOne', async (ctx) => {
  const { name } = ctx.request.body
  try {
    const findName = await Type.find({name})
    if (findName.length) {
      ctx.body = {
        code: 205,
        msg: '类型已存在'
      }
    } else {
      const ctype = await Type.create({name})
      ctype && (ctx.body = {
        code: 200,
        msg: '添加成功'
      })
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: error
    }
  }
})

// 添加子类型
router.post('/addTwo', async (ctx) => {
  const { name, parentId, pic } = ctx.request.body
  if (parentId === undefined || name === undefined || pic === undefined) {
    ctx.body = {
      code: 206,
      msg: '请将参数填写完整'
    }
    return
  }
  try {
    const findName = await Type.find({name, parentId})
    if (findName.length) {
      ctx.body = {
        code: 205,
        msg: '类型已存在'
      }
    } else {
      const ctype = await Type.create({name, parentId, pic})
      ctype && (ctx.body = {
        code: 200,
        msg: '添加成功'
      })
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: error
    }
  }
})

// 删除类型
router.post('/deltype', async (ctx) => {
  const { id } = ctx.request.body
  await Type.deleteOne({_id: id})
  ctx.body = {
    code: 200,
    msg: '删除成功'
  }
})

// 查询所有
router.get('/typeList', async (ctx) => {
  // 对数据进行拷贝，否则无法进行修改
  let data = JSON.parse(JSON.stringify(await Type.find()))
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: translateDataToTree(data)
  }
})

function translateDataToTree(data) {
  let parents = data.filter(value => value.parentId === '' || value.parentId == null)
  let children = data.filter(value => value.parentId !== '' && value.parentId != null)
  let translator = (parents, children) => {
    parents.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent._id) {
          let temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
        }
      }
      )
    }
    )
  }
 
  translator(parents, children)
 
  return parents
}


module.exports = router