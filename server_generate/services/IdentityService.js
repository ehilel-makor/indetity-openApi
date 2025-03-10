/* eslint-disable no-unused-vars */
const model = require('../models/Identity')
const Service = require('./Service')

/*
* Create identity
*
* identityCreate IdentityCreate Insert identity details
* no response value expected for this operation
*/
const createIdentity = (payload, res) =>
  new Promise((resolve) => {
    model.createIdentity(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    }, res)
  })
/*
* Delete a identity
*
* id String identity id to delete
* no response value expected for this operation
*/
const deleteIdentity = (payload, res) =>
  new Promise((resolve) => {
    model.deleteIdentity(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    }, res)
  })
/*
* Finds all identities
* get all identities
*
* returns identity
*/
const getIdentities = (payload, res) =>
  new Promise((resolve) => {
    model.getIdentities(payload, ({ data, status }) => {
      console.log({ payload });

      resolve(Service.successResponse(data, status || 500))
    }, res)
  })
/*
* Find identity by ID
* Returns a single identity
*
* id String The identity id
* returns identity
*/
const getIdentityById = (payload, res) =>
  new Promise((resolve) => {
    model.getIdentityById(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    }, res)
  })
/*
* Update an existing identity
*
* id String Id of identity
* identityUpdate IdentityUpdate insert identity content
* no response value expected for this operation
*/
const updateIdentity = (payload, res) =>
  new Promise((resolve) => {
    model.updateIdentity(payload, ({ data, status }) => {
      resolve(Service.successResponse(data, status || 500))
    }, res)
  })

module.exports = {
  createIdentity,
  deleteIdentity,
  getIdentities,
  getIdentityById,
  updateIdentity,
}
