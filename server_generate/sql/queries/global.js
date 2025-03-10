const DB_NAME = process.env.DB_NAME

const get = (table) => {
  return `
    SELECT *
    FROM ${DB_NAME}.${table};`
}

const getBy = (table, field) => {
  return `
    SELECT *
    FROM ${DB_NAME}.${table}
    WHERE ${field} = ?;`
}

const updateById = ( table, values, id ) => {
  return `
  UPDATE ${DB_NAME}.${table}
  SET ${Object.keys(values).map((key) => `${key} = ? `)}
  WHERE id = ${id};`
}

const insert = ( table, values ) => {
  return `
  INSERT INTO ${DB_NAME}.${table} (${Object.keys(values).join(', ')})
  VALUES (${Object.values(values).map(() => '?').join(', ')})`
}

const deleteByQuery = ( table, query ) => {
  return `
  DELETE FROM ${DB_NAME}.${table}
  WHERE ${query};`
}

module.exports = {
  get,
  getBy,
  insert,
  updateById,
  deleteByQuery
}
