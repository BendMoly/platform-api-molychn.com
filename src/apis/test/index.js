import Router from 'koa-router'
import adminUsers from '../../db/models/user'
import chalk from 'chalk'

const test = new Router({
  prefix: '/test'
})

test.get('/databasetest', async(ctx) => {
  let silence = new adminUsers({ account: 'Silence' })
  silence.save((err, silence) => {
    if (err) console.error(chalk.red(err))
    console.log(chalk.green('save successfully'))
  })
})

export default test
