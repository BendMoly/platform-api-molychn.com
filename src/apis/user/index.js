const Router = require('koa-router')
const user = new Router({
  prefix: '/admin/v1/user'
})

// 方法引入
const login = require('./methods/login.js')

// 用户登录
user.post('/login', login)

module.exports = user
