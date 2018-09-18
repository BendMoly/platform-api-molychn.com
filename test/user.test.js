import chalk from 'chalk'
import app from '../src/app'
const request = require('supertest')(app)
const Authorization = new Buffer("molychn:lincanyue").toString('base64')

describe('User api test', () => {
  describe('#login', () => {
    it('should return successful status code 200', (done) => {
      request
        .post('/admin/v1/user/login')
        .set('Authorization', `Basic ${Authorization}`)
        .send({account: 'molychn', password: 'lincy11221215{ok!}'})
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(chalk.red(err))
            return
          }
          done()
        })
    })
  })
})
