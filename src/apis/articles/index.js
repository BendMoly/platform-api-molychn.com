import Router from 'koa-router'
import Articles from '../../methods/v2/Articles'

const articles = new Router({
  prefix: '/admin/v2'
})

const unauthArticles = new Router({
  prefix: '/v2'
})

articles
.post('/articles', Articles.release)
.get('/articles', Articles.list)
.get('/article/:id', Articles.detail)
.delete('/article/:id', Articles.delete)
// articles.get('/articles/:id', Articles.detail)
// articles.put('/articles/:id', Articles.edit)
// articles.del('/articles/:id', Articles.del)

unauthArticles
.get('/articles', Articles.list)
.get('/article/:id', Articles.detail)

export default articles
export {unauthArticles}
