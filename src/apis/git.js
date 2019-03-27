import Router from 'koa-router'
const exec = require('child_process').exec

const git = new Router()

git
.post('/gitpush', async (ctx, next) => {
  console.log('git post coming')
  const cmd = 'sh /root/api/update.sh'
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
  })
  ctx.success(204)
})

export default git