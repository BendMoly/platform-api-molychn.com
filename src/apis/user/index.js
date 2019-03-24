import Router from 'koa-router'
import User from '../../methods/v2/User'
const user = new Router({
  prefix: '/admin/v2'
})

// 用户登录
user.post('/login', User.login)

export default user
