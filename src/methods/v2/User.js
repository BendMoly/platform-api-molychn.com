import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import connect from '../../mysql/index'

class User {
  constructor () {}

  async login (ctx) {
    try {
      let {account, password} = ctx.request.body
      // pswParse
      let pswParse = crypto.createHash('md5').update(password).digest('hex')
      console.log(pswParse)
      // 连接数据库
      let connectRes = await connect.login(account, pswParse)
      if (connectRes) {
        let token = jwt.sign({
          account: connectRes.account,
          role: connectRes.role
        },
        's%3AiixWP4IQxL8wuODZ-81YcB4DeL7Jl9Ma.gPckaI%2FZdTI%2BQVAZYG59WP%2FWxSPhyyHStdxNuRkNGc0',
        {
          expiresIn: '24h'
        })
        ctx.success(200, token)
      } else {
        ctx.error(401, 'account or password incorrect')
      }
    } catch(err) {
      ctx.error(500)
    }
  }
}

export default new User()