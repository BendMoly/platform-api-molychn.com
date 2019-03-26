import Router from 'koa-router'
import Folders from '../../methods/v2/Folders'

const folders = new Router({
  prefix: '/admin/v2'
})

folders
.post('/folders', Folders.insert)
.get('/folders', Folders.list)
.delete('/folders/:id', Folders.delete)

export default folders
