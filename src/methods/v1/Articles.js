import Article from '../../db/models/Articles/articles'
import Columns from '../../db/models/columns'
import chalk from 'chalk'

class Articles {
  constructor () {}

  async list (ctx) {
    let params = {}
    // 请求参数
    let {current = 1, start, end, keys, pagesize = 10} = ctx.query
    // 判断检索条件
    if (start) {
      params["date"] = {
        "$gte": new Date(Number(start)),
        "$lt": new Date(Number(end))
      }
    }
    if (keys) {
      params["title"] = new RegExp(unescape(keys))
    }
    let count = await databseCount(Article, params)
    let res = await databaseFind(Article, params, 'title date columnId columnName tags abstract', {skip: (current - 1) * Number(pagesize), limit: Number(pagesize), sort: {date: -1}})
    if (res) {
      // console.log(res)
      // for (let i = 0; i < res.length; i++) {
      //   let checkColumns = await databaseFind(Columns, {_id: res[i].columnId})
      //   if (checkColumns.length) {
      //     console.log(checkColumns[0].title)
      //     res[i]['columnName'] = checkColumns[0].title
      //   } else {
      //     res[i]['columnName'] = 'default'
      //   }
      //   console.log(res[i])
      // }
      let resBody = {
        current: Number(current ? current : 1),
        count: count,
        items: res
      }
      // console.log(res)
      ctx.success(200, resBody)
    }
  }

  async send (ctx) {
    let {title, columnId, columnName, tags, abstract = '', content} = ctx.request.body
    // 判断标签是否存在
    let checkRes = await databaseFind(Columns, {_id: columnId})
    if (checkRes.length) {
      if (checkRes[0].tags) {
        for (let i = 0; i < tags.length; i++) {
          if (!(checkRes[0].tags.includes(tags[i]))) {
            await databaseEdit(Columns, columnId, {'$push': {tags: tags[i]}})
          }
        }
      } else {
        await databaseEdit(Columns, columnId, {tags: tags})
      }
    }
    let date = new Date()
    // let a = new Date(1535770907000)
    // let b = new Date(1536116507000)
    // let date = randomDate(a, b)
    let articles = new Article({
      title,
      date,
      columnId,
      columnName,
      tags,
      abstract,
      content
    })
    let res = await databaseSave(articles)
    if (res) {
      ctx.response.status = 200
      ctx.response.body = 'publish success'
    }
  }

  async detail (ctx) {
    let _id = urlSplit(ctx.url)
    let res = await databaseFind(Article, {_id}, null)
    if (res) {
      let resBody = res[0]
      ctx.success(200, resBody)
    }
  }

  async edit (ctx) {
    let _id = urlSplit(ctx.url)
    let res = await databaseEdit(Article, _id, ctx.query)
    if (res) {
      console.log(res)
      ctx.success(204)
    }
  }

  async del (ctx) {
    let _id = urlSplit(ctx.url)
    let res = await databaseDel(Article, _id)
    console.log(res)
    if (res) {
      if (res.n) {
        ctx.success(204)
      } else {
        ctx.error(403, {
          message: 'id may not exist'
        })
      }
    } else {
      ctx.error(403)
    }
  }
}
const databseCount = (schema, params = {}) => {
  return new Promise((resolve, reject) => {
    schema.count(params, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}
const databaseFind = (schema, params = {}, cols = null, condition = {}) => {
  return new Promise((resolve, reject) => {
    schema.find(params, cols, condition, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}
const databaseSave = (model) => {
  return new Promise((resolve, reject) => {
    model.save((err, model) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      console.log(chalk.green('databaseOP success'))
      resolve(true)
    })
  })
}
const databaseEdit = (model, id, update) => {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate({_id: id}, update, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}
const databaseDel = (model, params) => {
  return new Promise((resolve, reject) => {
    model.deleteOne({_id: params}, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}
const urlSplit = (url) => {
  let urlPathAndQuery = url.split('?')
  let urlPath = urlPathAndQuery[0]
  let urlParams = urlPath.split('/')
  let _id = urlParams[urlParams.length - 1]
  return _id
}
const randomDate = (a, b) => {
  let date = new Date()
  let aa = a.getTime()
  let bb = b.getTime()
  date.setTime(Math.random() * (bb - aa) + aa)
  return date
}

export default new Articles()
