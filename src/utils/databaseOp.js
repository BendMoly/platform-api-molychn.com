import chalk from 'chalk'

export const databseCount = (schema, params = {}) => {
  return new Promise((resolve, reject) => {
    schema.countDocuments(params, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}

export const databaseFind = (schema, params = {}, cols = null, condition = {}) => {
  return new Promise((resolve, reject) => {
    schema.find(params, cols, condition, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}

export const databaseSave = (model) => {
  return new Promise((resolve, reject) => {
    model.save((err, model) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      console.log(chalk.green('databaseOP success'))
      resolve(true)
    })
  })
}

export const databaseEdit = (model, id, update) => {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate({_id: id}, update, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}

export const databaseDel = (model, params) => {
  return new Promise((resolve, reject) => {
    model.deleteOne({_id: params}, (err, res) => {
      if (err) {
        console.error(chalk.red(err))
        reject(err)
      }
      resolve(res)
    })
  })
}

export const urlSplit = (url) => {
  let urlPathAndQuery = url.split('?')
  let urlPath = urlPathAndQuery[0]
  let urlParams = urlPath.split('/')
  let _id = urlParams[urlParams.length - 1]
  return _id
}

export const randomDate = (a, b) => {
  let date = new Date()
  let aa = a.getTime()
  let bb = b.getTime()
  date.setTime(Math.random() * (bb - aa) + aa)
  return date
}
