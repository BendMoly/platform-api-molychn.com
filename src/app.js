import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// Basic Auth机制
import auth from 'koa-basic-auth'
import mount from 'koa-mount'
// 基础配置
import res from './utils/response'
import configuration from './config/index'
import db from './db'
// interface
import user from './apis/user'
import articles from './apis/articles'
import articlesNoAuth from './apis/articles/index_noauth'
import columns from './apis/columns'
import upload from './apis/upload'

const app = new Koa()
app.use(bodyParser())
app.use(cors())
app.use(res())

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
app.use(mount('/admin', auth({ name: 'molychn', pass: 'lincanyue' })))
app.use(user.routes())
app.use(articles.routes())
app.use(columns.routes())

app.use(articlesNoAuth.routes())
app.use(upload.routes())
// app.use(test.routes())

export default app.listen(configuration.PORT, '0.0.0.0', () => {
  console.log(`app start at port ${configuration.PORT}`)
})
