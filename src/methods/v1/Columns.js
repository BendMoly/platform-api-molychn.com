import Columns from '../../db/models/columns'
import chalk from 'chalk'

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

const databaseSave = (model) => {
  return new Promise((resolve, reject) => {
    model.save((err) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      console.log(chalk.green('databaseOP success'))
      resolve(true)
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

export default new Column()
