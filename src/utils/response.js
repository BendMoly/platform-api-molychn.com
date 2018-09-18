'use strict'

const res = () => {
  return async function (ctx, next) {
    /**
     *
     * @param {number} status status code
     * @param {*} data response data
     * @description method which the success interface uses
     */
    ctx.success = (status, data) => {
      // whether the status is success status code, like 200, 201, 204,etc
      if (typeof status === 'number' && [200, 201, 204].includes(status)) {
        ctx.response.status = status
        ctx.response.body = data
      } else {
        throw new Error('unmatch status')
      }
    }
    ctx.error = (status, err) => {
      if (typeof status === 'number') {
        ctx.response.status = status
        if (err) ctx.response.body = err
      } else {
        throw new Error('unmatch status')
      }
    }
    await next()
  }
}

export default res