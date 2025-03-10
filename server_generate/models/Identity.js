const dbHelper = require('../db/dbHelper.js')
const query = require('../sql/queries/global.js')


// constructor
const Identity = () => { };


Identity.createIdentity = async (payload, result) => {
  try {
    const res = await dbHelper.execute(query.insert('detail', payload.body), payload.body)
    return result({ status: 201, data: res })
  } catch (error) {
    console.log({ error });

    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}

//get all identity
Identity.getIdentities = async (payload, result) => {
  try {
    const res = await dbHelper.get(query.get('detail'))
    console.log({ res });

    return result({ status: 200, data: res })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
};

//get identity by id
Identity.getIdentityById = async (payload, result) => {
  try {
    const { id } = payload;
    const res = await dbHelper.execute(query.getBy('detail', 'id'), id)
    return result({ status: 200, data: res })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
};

//update identity
Identity.updateIdentity = async (payload, result) => {
  try {
    const { id } = payload;
    const res = await dbHelper.execute(query.updateById('detail', payload.body, id), payload.body)
    return result({ status: 201, data: res })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
};

//delete identity
Identity.deleteIdentity = async (payload, result) => {
  try {
    const { id } = payload;
    const res = dbHelper.deleteByQuery(query.deleteByQuery('detail', `id = ${id}`))
    return result({ status: 200, data: res })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
};

module.exports = Identity;
