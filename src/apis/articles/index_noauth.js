import Router from 'koa-router'
import Articles from '../../methods/v1/Articles'

const articles = new Router({
  prefix: '/v1'
})

articles.get('/articles', Articles.list)
articles.get('/articles/:id', Articles.detail)

export default articles
