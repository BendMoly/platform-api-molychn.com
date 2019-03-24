import Router from 'koa-router'
import Articles from '../../methods/v2/Articles'

const articles = new Router({
  prefix: '/admin/v2'
})

articles
.post('/articles', Articles.release)
.get('/articles', Articles.list)
// articles.get('/articles/:id', Articles.detail)
// articles.put('/articles/:id', Articles.edit)
// articles.del('/articles/:id', Articles.del)

export default articles
