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
    let {current, type = null, text = null, start = null, end = null} = ctx.query
    let res = await connect.checkArticles(current, type, text, start, end)
    if (res) {
      ctx.success(200, res)
    }
  }
}

export default new Articles()