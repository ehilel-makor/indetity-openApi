/* eslint-disable no-unused-vars */
const model = require('../models/Identity');
const Service = require('./Service');

/**
* Delete a identity
*
* id String identity id to delete
* no response value expected for this operation
* */
const deleteIdentity = ( payload ) => 
  new Promise(async (resolve, reject) => {
    model.deleteIdentity( payload, (error, data) => {
      error
        ? reject(Service.rejectResponse(error.status || 500, error.code || '5.0'))
        : resolve(Service.successResponse(data));
    });  
  });
/**
* Finds all identities
* get all identities
*
* returns identity
* */
const getIdentities = ( payload ) => 
  new Promise(async (resolve, reject) => {
    model.getIdentities( payload, (error, data) => {
      error
        ? reject(Service.rejectResponse(error.status || 500, error.code || '5.0'))
        : resolve(Service.successResponse(data));
    });  
  });
/**
* Find identity by ID
* Returns a single identity
*
* id String The identity id
* returns identity
* */
const getIdentityById = ( payload ) => 
  new Promise(async (resolve, reject) => {
    model.getIdentityById( payload, (error, data) => {
      error
        ? reject(Service.rejectResponse(error.status || 500, error.code || '5.0'))
        : resolve(Service.successResponse(data));
    });  
  });
/**
* Update an existing identity
*
* id String Id of identity
* identityUpdate IdentityUpdate insert identity content
* no response value expected for this operation
* */
const updateIdentity = ( payload ) => 
  new Promise(async (resolve, reject) => {
    model.updateIdentity( payload, (error, data) => {
      error
        ? reject(Service.rejectResponse(error.status || 500, error.code || '5.0'))
        : resolve(Service.successResponse(data));
    });  
  });

module.exports = {
  deleteIdentity,
  getIdentities,
  getIdentityById,
  updateIdentity,
};
