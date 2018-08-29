import mongoConf from '../config/index'
import mongodb from 'mongodb'

const mc = mongodb.MongoClient
const connection = () => {
  return new Promise((resolve, reject) => {
    mc.connect(mongoConf.database, (err, db) => {
      if (err) {
        reject(err)
        throw err
      }
      console.log('database connecting')
      resolve(db)
    })
  })
}

export default connection
