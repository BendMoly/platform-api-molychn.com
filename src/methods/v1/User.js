import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import connection from '../../db/connection'

class User {
  constructor () {}

  async login (ctx) {
    console.log(ctx.request.body)
    try {
      let data = {
        account: ctx.request.body.account,
        password: crypto.createHash('md5').update(ctx.request.body.password).digest()
      }
      let connectDB = await connection()
      let res = await findUser(connectDB, data)
      if (res) {
        let token = jwt.sign({
          account: ctx.request.body.account,
          role: 'admin'
        },
        's%3AiixWP4IQxL8wuODZ-81YcB4DeL7Jl9Ma.gPckaI%2FZdTI%2BQVAZYG59WP%2FWxSPhyyHStdxNuRkNGc0', {
          expiresIn: '1 day'
        })
        ctx.response.status = 200
        ctx.response.body = token
      } else {
        ctx.response.status = 403
        ctx.response.body = {
          message: 'Incorrect account or password'
        }
      }
    } catch(err) {
      console.log(err)
      ctx.response.status = 500
      ctx.response.body = '服务器错误'
    }
  }
}

const findUser = (db, data) => {
  return new Promise((resolve, reject) => {
    let dbase = db.db('molychn')
    dbase.collection('user').find(data).toArray((err, res) => {
      if (err) {
        reject(err)
        throw err
      }
      console.log(res)
      if (res.length) {
        resolve(true)
      } else {
        resolve(false)
      }
      db.close()
    })
  })
}

export default new User()
