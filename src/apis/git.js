import Router from 'koa-router'
const exec = require('child_process').exec

const git = new Router()

git
.post('/gitpush', async (ctx, next) => {
  const cmd = '/root/api/update.sh'
  exec(cmd)
  ctx.success(204)
})

export default git