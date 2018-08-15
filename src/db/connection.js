const mongoConf = require('./db.conf')
const MongoClient = require('mongodb').MongoClient

let url = `mongodb://localhost:${mongoConf.PORT}/${mongoConf.databaseName}`

const connection = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err)
        throw err
      }
      console.log('database connecting')
      resolve(db)
    })
  })
}

module.exports = connection
