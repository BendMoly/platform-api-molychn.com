import Router from 'koa-router'
import Articles from '../../methods/v1/Articles'

const articles = new Router({
  prefix: '/admin/v1'
})

articles.post('/articles', Articles.send)
articles.get('/articles', Articles.list)
articles.get('/articles/:id', Articles.detail)
articles.put('/articles/:id', Articles.edit)
articles.del('/articles/:id', Articles.del)

export default articles
