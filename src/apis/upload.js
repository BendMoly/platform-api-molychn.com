import Router from 'koa-router'
import Upload from '../methods/v1/Upload'

const upload = new Router({
  prefix: '/admin/v1'
})
const upload_noauth = new Router({
  prefix: '/v1'
})

upload.get('/upload', Upload.token)
upload.get('/uploads', Upload.list)
upload_noauth.post('/upload', Upload.callback)

export default upload
export { upload_noauth }
