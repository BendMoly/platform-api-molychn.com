const crypto = require('crypto')
const md5 = crypto.createHash('md5')

const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool(config.mysql)

pool.getConnection((err, connection) => {
  const query = 'INSERT INTO users (account, password, nickname, role) VALUES (?, ?, ?, ?)'

  connection.query(query, ['molychn', md5.update('lincy1314:)P520').digest('hex'), 'molychn', 1], (err, result) => {
    if (result) {
      console.log('insert success')
    }
  })

  connection.release()
})
