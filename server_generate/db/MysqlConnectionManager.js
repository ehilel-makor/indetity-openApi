const mysql = require('mysql2')
const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_CONNECTIONS_LIMIT } = process.env || require('../config')

const master = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    connectionLimit: MYSQL_CONNECTIONS_LIMIT,
    multipleStatements: false
  })
  .promise()

const slave = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    connectionLimit: MYSQL_CONNECTIONS_LIMIT,
    multipleStatements: false
  })
  .promise()

module.exports = { master, slave }
