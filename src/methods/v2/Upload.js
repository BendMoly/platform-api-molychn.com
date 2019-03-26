import crudQiniu, {accessKey, secretKey, generateToken} from '../../config/qiniu'
import connect from '../../mysql/index'
import crypto from 'crypto-js'
import qiniu from '../../config/qiniu';


class Upload {
  constructor () {}

  async token (ctx) {
    ctx.success(200, generateToken())
  }

  // async list (ctx) {
  //   // 获取列表参数
  //   let {marker = '', limit = 10, prefix = ''} = ctx.query
  //   let path = `/list?bucket=blog-src`
  //   let accessToken = generateAccessToken(path)
  //   console.log(`accessToken: ${accessToken}`)
  //   let res = await crudQiniu.list(path, accessToken)
  //   console.log(res)
  //   if (res) {
  //     if (typeof res === 'object') {
  //       ctx.success(200, res)
  //     } else {
  //       let result = JSON.parse(res)
  //       ctx.success(200, result)
  //     }
  //   } else {
  //     ctx.error(403, res)
  //   }
  // }

  async callback (ctx) {
    console.log('qiniu callback is coming')
    const default_src = 'http://qiniu.molychn.com'
    let {name, width, height} = ctx.request.body
    let res = await connect.insertUploads(`${default_src}/${name}`, name, width / height < 4 ? 0 : 1)
    if (res) {
      console.log(res)
      ctx.success(200, {
        message: 'upload success'
      })
    }
  }

  async list (ctx) {
    let res = await connect.checkUploads()
    if (res) {
      console.log(res)
      let resBody = {
        items: res
      }
      ctx.success(200, resBody)
    }
  }

  async delete (ctx) {
    let {name} = ctx.query
    console.log(`delete file name: ${name}`)
    let qiniuDelCb = await qiniu.delete(name)
    // 判断七牛服务器是否成功删除文件回调删除数据库索引
    if (qiniuDelCb) {
      let res = await connect.delUploadFile(name)
      if  (res) {
        ctx.success(204)
      } else {
        ctx.error(403)
      }
    } else {
      ctx.error(403, 'file may not found')
    }
  }
}

export default new Upload()

const generateAccessToken = (path) => {
  let signingStr = path + '\n'
  console.log(signingStr)
  let sign = crypto.HmacSHA1(signingStr, secretKey)
  console.log(`sign: ${sign}`)
  let encodedSign = sign.toString(crypto.enc.Base64)
  console.log(`encodedSign: ${encodedSign}`)
  return `QBox ${accessKey}:${encodedSign}`
}
