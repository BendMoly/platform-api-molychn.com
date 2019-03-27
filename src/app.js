import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// Basic Auth机制
import auth from 'koa-basic-auth'
import mount from 'koa-mount'
import jwt from 'jsonwebtoken'
// 基础配置
import res from './utils/response'
import configuration from './config/index'

// mongodb暂不使用
// import db from './db'
import mysql from './mysql'

// interface
import user from './apis/user'
import articles, {unauthArticles} from './apis/articles'
// import articlesNoAuth from './apis/articles/index_noauth'
import folders from './apis/folders'
import upload from './apis/upload'
import { upload_noauth } from './apis/upload'

import git from './apis/git'

const app = new Koa()
app.use(bodyParser())
app.use(cors())
app.use(res())

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  // 监听admin接口时效性
  if (ctx.url.indexOf('login') == -1 && ctx.url.indexOf('admin') != -1) {
    try {
      let tokenVerify = jwt.verify(ctx.header.token, 's%3AiixWP4IQxL8wuODZ-81YcB4DeL7Jl9Ma.gPckaI%2FZdTI%2BQVAZYG59WP%2FWxSPhyyHStdxNuRkNGc0')
      if (tokenVerify) {
        console.log('token没有过期')
        await next()
      }
    } catch (err) {
      console.log(err)
      ctx.error(401, 'token out of date')
    }
  } else {
    await next()
  }
})
app.use(mount('/admin', auth({ name: 'molychn', pass: 'lincanyue' })))
app.use(user.routes())
app.use(articles.routes())
app.use(folders.routes())

app.use(unauthArticles.routes())
app.use(upload.routes())
app.use(upload_noauth.routes())
app.use(git.routes())

export default app.listen(configuration.PORT, '0.0.0.0', () => {
  console.log(`app start at port ${configuration.PORT}`)
})
