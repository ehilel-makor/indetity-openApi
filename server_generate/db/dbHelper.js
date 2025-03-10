const { master, slave } = require('../db/MysqlConnectionManager')

const getConnection = async () => {
  return await master.getConnection()
}

const releaseConnection = async (connection) => {
  await connection.release()
}

const executeByConnection = async (sqlQuery, data = {}, connection) => {
  let response
  try {
    response = await connection.query(sqlQuery, Object.values(data))
  } catch (error) {
    console.log({ error })
  }
  return response[0]
}

const execute = async (sqlQuery, data = {}) => {
  let response
  try {
    response = await master.query(sqlQuery, Object.values(data))
  } catch (error) {
    console.log(error);
  }
  return response[0]
}

const get = async (sqlQuery, data = {}) => {
  let response
  try {
    response = await slave.query(sqlQuery, Object.values(data))
  } catch (error) {
    console.log(error)
  }
  return response[0]
}

module.exports = {
  getConnection,
  releaseConnection,
  executeByConnection,
  execute,
  get
}
