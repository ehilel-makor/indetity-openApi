const sql = require('../utils/db');
const moment = require('moment');

// constructor
const Identity = () => {};

//get all identity
Identity.getIdentities = (payload, result) => {
  sql.query(
    `SELECT id, first_name, last_name, email, gender, ip_address FROM detail;`,
    (err, res) => {
      return err ? result({ status: 404, code: '4.2' }) : result(null, res);
    }
  );
};

//get identity by id
Identity.getIdentityById = (payload, result) => {
  const { id } = payload;
  sql.query(
    `SELECT id, first_name, last_name, email, gender, ip_address
   FROM detail WHERE id = ${id};`,
    (err, res) => {
      return err ? result({ status: 404, code: '4.2' }) : result(null, res);
    }
  );
};

//update identity
Identity.updateIdentity = async (payload, result) => {
  const { id } = payload;
  let query_str = await update_query_str(payload.identityUpdate, 'detail', id);
  if (query_str) {
    const { err, res } = await update_in_data_base(query_str);
    if (err) return result({ status: 404, code: '4.3' });
  }
  return result(null, { code: '2.2' });
};

//delete identity
Identity.deleteIdentity = async (payload, result) => {
  const { id } = payload;
  let query_str = await delete_query_str('detail', id);
  if (query_str) {
    const { err, res } = await update_in_data_base(query_str);
    if (err) return result({ status: 404, code: '4.4' });
  }
  return result(null, { code: '2.2' });
};

module.exports = Identity;

// create string to query update main
function create_query_str(payload, target) {
  return new Promise(async (resolve, reject) => {
    let str_key = `INSERT INTO ${target} (`;
    let str_value = 'VALUES (';
    for await (let [key, val] of Object.entries(payload)) {
      if (val === undefined) val = null;
      str_key += `${key}, `;
      switch (key) {
        case /.*\_at/.test(key):
          str_value +=
            val === null
              ? `${val}, `
              : `'${moment(val, ['DDMMYYYY', 'YYYYMMDD']).format('YYYY-MM-DD HH:mm:ss')}', `;
          break;
        default:
          typeof val === 'string' ? (str_value += `'${val}', `) : (str_value += `${val}, `);
          break;
      }
    }
    if (str_key === `INSERT INTO ${target} (`) return resolve(null);
    str_key = `${str_key.slice(0, -2)})`;
    str_value = `${str_value.slice(0, -2)})`;
    return resolve(`${str_key} ${str_value}; `);
  });
}

// update string to query update main
function update_query_str(payload, target, id) {
  return new Promise(async (resolve, reject) => {
    let str_query = `UPDATE ${target} SET `;
    for await (let [key, val] of Object.entries(payload)) {
      if (typeof val !== 'object' || val !== undefined) {
        switch (key) {
          case /.*\_at/.test(key):
            str_query +=
              val === null
                ? `${key} = ${val}, `
                : `${key} = '${moment(val, ['DDMMYYYY', 'YYYYMMDD']).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}', `;
            break;
          default:
            typeof val === 'string'
              ? (str_query += `${key} = '${val}', `)
              : (str_query += `${key} = ${val}, `);
            break;
        }
      }
    }
    if (str_query === `UPDATE ${target} SET `) return resolve(null);
    str_query = `${str_query.slice(0, -2)}`;
    return resolve(`${str_query} WHERE id = ${id}`);
  });
}

// delete string to query update main
function delete_query_str(target, id) {
  return new Promise(async (resolve, reject) => {
    return resolve(`DELETE FROM ${target} WHERE id = ${id}`);
  });
}

// update in database
function update_in_data_base(payload) {
  return new Promise((resolve, reject) => {
    try {
      sql.query(`${payload}`, (err, res) => {
        if (err) return reject({ err });
        return resolve({ res });
      });
    } catch (error) {
      reject({ err: error });
    }
  });
}
