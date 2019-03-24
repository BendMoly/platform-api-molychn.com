import connect from '../../mysql'

class Folders {
  constructor () {}

  /**
   * @description 获取栏目列表
   * @param {*} ctx
   * @memberof Folders
   */
  async list (ctx) {
    let res = await connect.checkFolders()
    if (res) {
      ctx.success(200, res)
    } else {
      ctx.error(500)
    }
  }

  async insert (ctx) {
    let {name} = ctx.request.body
    let res = await connect.insertFolder(name)
    if (res) {
      ctx.success(204)
    } else {
      ctx.error(403, `${name} may exist`)
    }
  }

}

export default new Folders()
