import Router from 'koa-router'
import Upload from '../methods/v2/Upload'

const upload = new Router({
  prefix: '/admin/v2'
})
const upload_noauth = new Router({
  prefix: '/v2'
})

upload
.get('/upload', Upload.token)
.get('/uploads', Upload.list)
.delete('/uploads', Upload.delete)

upload_noauth
.post('/upload', Upload.callback)

export default upload
export { upload_noauth }
