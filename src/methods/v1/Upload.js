import qiniuToken from '../../config/qiniu'
// import chalk from 'chalk'

class Upload {
  constructor () {}

  async token (ctx) {
    console.log(11)
    ctx.success(200, qiniuToken)
  }
}

export default new Upload()
