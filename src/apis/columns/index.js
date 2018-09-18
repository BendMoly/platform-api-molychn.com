import Router from 'koa-router'
import Columns from '../../methods/v1/Columns'

const columns = new Router({
  prefix: '/admin/v1'
})

columns
.get('/columns', Columns.list)
.post('/columns', Columns.send)

export default columns
