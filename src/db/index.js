import mongoose from 'mongoose'
import chalk from 'chalk'
import config from '../config/index'

mongoose.connect(config.database)

const db = mongoose.connection

db.once('open', () => {
  console.log(chalk.green('database connecting'))
})
db.on('error', (err) => {
  console.error(chalk.red(`Error in database: ${err}`))
})
db.on('close', () => {
  console.log(chalk.red('database closed, reconnecting'))
  mongoose.connect(config.database, {server: {auto_reconnect: true}})
})

export default db