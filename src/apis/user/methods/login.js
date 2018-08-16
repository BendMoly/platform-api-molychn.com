const crypto = require('crypto')
const connection = require('../../../db/connection')
const login = async (ctx) => {
  console.log(ctx.request.body)
  try {
    let data = {
      account: ctx.request.body.account,
      password: crypto.createHash('md5').update(ctx.request.body.password).digest()
    }
    let connectDB = await connection()
    let res = await findUser(connectDB, data)
    if (res) {
      ctx.response.status = 200
      ctx.response.body = 'login success'
    } else {
      ctx.response.status = 403
      ctx.response.body = {
        message: 'Incorrect account or password'
      }
    }
    // let dbase = connectDB.db('molychn')
    // dbase.collection('user').find(data).toArray((err, res) => {
    //   if (err) throw err
    //   console.log(res)
    //   console.log(res.length)
    //   if (res.length) {
    //     console.log(ctx)
    //     ctx.response.status = 200
    //     ctx.response.body = 'login success'
    //   } else {
    //     ctx.response.status = 401
    //     ctx.response.body = '账号或密码错误'
    //   }
    //   connectDB.close()
    // })
  } catch(err) {
    console.log(err)
    ctx.response.status = 500
    ctx.response.body = '服务器错误'
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
      console.log(res.length)
      if (res.length) {
        resolve(true)
      } else {
        resolve(false)
      }
      db.close()
    })
  })
}

module.exports = login