import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// Basic Auth机制
import auth from 'koa-basic-auth'
import mount from 'koa-mount'
// 基础配置
import configuration from './config/index'
import db from './db'
// interface
import user from './apis/user'
import test from './apis/test'


const app = new Koa()
app.use(bodyParser())
app.use(cors())

app.use(mount('/admin', auth({ name: 'molychn', pass: 'lincanyue' })))
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
app.use(user.routes())
app.use(test.routes())

app.listen(configuration.PORT, '0.0.0.0', () => {
  console.log(`app start at port ${configuration.PORT}`)
})
