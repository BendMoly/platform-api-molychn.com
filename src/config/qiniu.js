import qiniu from 'qiniu'
import request from 'request'

const accessKey = '1vf7MYQg2xEjn2bvVlA5POUkwdev46DfmRGjWfVL'
const secretKey = '3Ci5oBnYmSnkt-Zf2mB4FVD20ioRALqy0b1faEuE'
const bucket = 'blog-src'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 构建BucketManager对象
let config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0
const bucketManager = new qiniu.rs.BucketManager(mac, config)

const options = {
  scope: 'blog-src',
  callbackUrl: 'http://molychn.com:12580/v2/upload',
  callbackBody: '{"name":"$(fname)","width":"$(imageInfo.width)","height":"$(imageInfo.height)"}',
  callbackBodyType: 'application/json'
}

let putPolicy = new qiniu.rs.PutPolicy(options)

const generateToken = () => {
  return putPolicy.uploadToken(mac)
}

class crudQiniu {
  constructor () {}

  async list (path, accessToken) {
    return new Promise((resolve, reject) => {
      request({
        url: `http://rsf.qbox.me/${path}`,
        method: 'GET',
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json'
        }
      }, (err, res, body) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(body)
      })
    })
  }

  async delete (name) {
    return new Promise((resolve, reject) => {
      console.log(bucket, name)
      bucketManager.delete(bucket, name, (err, resBody, resInfo) => {
        if (err) reject(err)
        console.log(resInfo)
        console.log(resBody)
        resolve(true)
      })
    })
  }
}

export default new crudQiniu()
export {accessKey, secretKey, generateToken, bucketManager}
