import Columns from '../../db/models/columns'
import chalk from 'chalk'
import { databaseFind, databaseSave } from '../../utils/databaseOp'

class Column {
  constructor () {}

  async list (ctx) {
    let res = await databaseFind(Columns)
    if (res) {
      ctx.success(200, res)
    }
  }

  async send (ctx) {
    let {title, subTitle, icon, temp} = ctx.request.body
    let tags = null
    let columns = new Columns({
      title,
      subTitle,
      icon,
      temp,
      tags
    })
    let res = await databaseSave(columns)
    if (res) {
      ctx.success(204)
    }
  }
}

export default new Column()
