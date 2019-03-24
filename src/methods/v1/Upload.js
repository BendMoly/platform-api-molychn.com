import Source from '../../db/models/source'
import generateToken from '../../config/qiniu'
import { databaseFind, databaseSave } from '../../utils/databaseOp'

class Upload {
  constructor () {}

  async token (ctx) {
    ctx.success(200, generateToken())
  }

  async callback (ctx) {
    const default_src = 'http://qiniu.molychn.com'
    console.log(ctx.request.body)
    let {name, width, height} = ctx.request.body
    let date = new Date()
    let source = new Source({
      src: `${default_src}/${name}`,
      date,
      isBanner: width / height < 4 ? false : true
    })
    let res = await databaseSave(source)
    if (res) {
      console.log(res)
      ctx.success(200, {
        message: 'upload success'
      })
    }
  }

  async list (ctx) {
    let res = await databaseFind(Source, null, null, {sort: {date: -1}})
    if (res) {
      console.log(res)
      let resBody = {
        items: res
      }
      ctx.success(200, resBody)
    }
  }
}

export default new Upload()
