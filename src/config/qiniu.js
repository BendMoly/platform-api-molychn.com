import qiniu from 'qiniu'

let accessKey = '1vf7MYQg2xEjn2bvVlA5POUkwdev46DfmRGjWfVL'
let secretKey = '3Ci5oBnYmSnkt-Zf2mB4FVD20ioRALqy0b1faEuE'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
  scope: 'blog-src'
}

let putPolicy = new qiniu.rs.PutPolicy(options)
let uploadToken = putPolicy.uploadToken(mac)

export default uploadToken
