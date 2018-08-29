import User from './v1/User'
import Router from 'koa-router'
const user = new Router({
  prefix: '/admin/v1/user'
})

// 用户登录
user.post('/login', User.login)

export default user
