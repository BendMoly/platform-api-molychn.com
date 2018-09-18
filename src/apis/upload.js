import Router from 'koa-router'
import Upload from '../methods/v1/Upload'

const upload = new Router({
  prefix: '/admin/v1'
})

upload.get('/upload', Upload.token)

export default upload