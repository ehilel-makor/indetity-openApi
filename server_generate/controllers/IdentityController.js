/**
 * The IdentityController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/IdentityService');
const createIdentity = async (request, response) => {
  await Controller.handleRequest(request, response, service.createIdentity);
};

const deleteIdentity = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteIdentity);
};

const getIdentities = async (request, response) => {
  await Controller.handleRequest(request, response, service.getIdentities);
};

const getIdentityById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getIdentityById);
};

const updateIdentity = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateIdentity);
};


module.exports = {
  createIdentity,
  deleteIdentity,
  getIdentities,
  getIdentityById,
  updateIdentity,
};
