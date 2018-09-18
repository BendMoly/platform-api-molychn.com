import Router from 'koa-router'
import User from '../../methods/v1/User'
const user = new Router({
  prefix: '/admin/v1/user'
})

// 用户登录
user.post('/login', User.login)

export default user
