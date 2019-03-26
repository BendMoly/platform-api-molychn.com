import connect from '../../mysql/index'

class Articles {
  constructor () {}

  async release (ctx) {
    let res = await connect.insertArticle(ctx.request.body)
    if (res) {
      ctx.success(204)
    }
  }

  async list (ctx) {
    console.log('check the article list')
    let {current, type = null, text = null, start = null, end = null} = ctx.query
    let res = await connect.checkArticles(current, type, text, start, end)
    if (res) {
      ctx.success(200, res)
    }
  }

  async detail (ctx) {
    let id = ctx.params.id
    let res = await connect.checkArticle(id)
    if (res) {
      ctx.success(200, res)
    }
  }

  async delete (ctx) {
    let id = ctx.params.id
    let res = await connect.delArticle(id)
    if (res) {
      ctx.success(204)
    }
  }
}

export default new Articles()