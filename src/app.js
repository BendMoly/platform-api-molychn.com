const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
// Basic Auth机制
const auth = require('koa-basic-auth')
const mount = require('koa-mount')

// const Router = require('koa-router')
const user = require('./apis/user')
// 基础配置
const configuration = require('./config')

const app = new Koa()
app.use(bodyParser())
app.use(cors())
// const router = new Router()
// router.get('/admin/:id', async(ctx, next) => {
//   console.log('admin')
//   ctx.response.status = 200
//   ctx.response.body = 'is admin'
//   await next()
// })
// router.get('/normal', async(ctx, next) => {
//   console.log('normal')
//   ctx.response.status = 200
//   ctx.response.body = 'is normal'
//   await next()
// })

app.use(mount('/admin', auth({ name: 'molychn', pass: 'lincanyue' })))
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
app.use(user.routes())

app.listen(configuration.PORT, '0.0.0.0', () => {
  console.log(`app start at port ${configuration.PORT}`)
})
