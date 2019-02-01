import Article from '../../db/models/articles'
import Columns from '../../db/models/columns'
import chalk from 'chalk'
import { databaseDel, databaseEdit, databaseFind, databaseSave, databseCount, urlSplit } from '../../utils/databaseOp'

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
    let res = await databaseFind(Article, params, 'title date columnId columnName tags abstract banner', {skip: (current - 1) * Number(pagesize), limit: Number(pagesize), sort: {date: -1}})
    if (res) {
      let resBody = {
        current: Number(current ? current : 1),
        count: count,
        items: res
      }
      ctx.success(200, resBody)
    }
  }

  async send (ctx) {
    let {title, columnId, columnName, tags, abstract = '', banner = '', content} = ctx.request.body
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
      banner,
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

export default new Articles()
