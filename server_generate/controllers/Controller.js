const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const config = require('../config');
const logger = require('../logger');

class Controller {
  static sendResponse(response, payload) {
    /**
    * The default response-code is 200. We want to allow to change that. in That case,
    * payload will be an object consisting of a code and a payload. If not customized
    * send 200 and the payload as received in this method.
    */
    response.status(payload.status || 200);
    const responsePayload = payload.payload !== undefined ? payload.payload : payload;
    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  static sendError(response, error) {
    response.status(error.status || 500);
    if (error.code instanceof Object) {
      response.json(error.code);
    } else {
      response.json(error);
    }
  }

  /**
  * Files have been uploaded to the directory defined by config.js as upload directory
  * Files have a temporary name, that was saved as 'filename' of the file object that is
  * referenced in reuquest.files array.
  * This method finds the file and changes it to the file name that was originally called
  * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
  * the filename and its extension
  * @param request
  * @param fieldName
  * @returns {string}
  */
  static collectFile(request, fieldName) {
    let uploadedFileName = '';
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find(file => file.fieldname === fieldName);
      if (fileObject) {
        const fileArray = fileObject.originalname.split('.');
        const extension = fileArray.pop();
        fileArray.push(`_${Date.now()}`);
        uploadedFileName = `${fileArray.join('')}.${extension}`;
        fs.renameSync(path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
          path.join(config.FILE_UPLOAD_PATH, uploadedFileName));
      }
    }
    return uploadedFileName;
  }

  static getRequestBodyName(request) {
    const codeGenDefinedBodyName = request.openapi.schema['x-codegen-request-body-name'];
    if (codeGenDefinedBodyName !== undefined) {
      return codeGenDefinedBodyName;
    }
    const refObjectPath = request.openapi.schema.requestBody.content['application/json'].schema.$ref;
    if (refObjectPath !== undefined && refObjectPath.length > 0) {
      return (refObjectPath.substr(refObjectPath.lastIndexOf('/') + 1));
    }
    return 'body';
  }

  // static collectRequestParams(request) {
  //   const requestParams = {};
  //   if (request.openapi.schema.requestBody !== undefined) {
  //     const { content } = request.openapi.schema.requestBody;
  //     if (content['application/json'] !== undefined) {
  //       const requestBodyName = camelCase(this.getRequestBodyName(request));
  //       requestParams[requestBodyName] = request.body;
  //     } else if (content['multipart/form-data'] !== undefined) {
  //       Object.keys(content['multipart/form-data'].schema.properties).forEach(
  //         (property) => {
  //           const propertyObject = content['multipart/form-data'].schema.properties[property];
  //           if (propertyObject.format !== undefined && propertyObject.format === 'binary') {
  //             requestParams[property] = this.collectFile(request, property);
  //           } else {
  //             requestParams[property] = request.body[property];
  //           }
  //         },
  //       );
  //     }
  //   }

  //   request.openapi.schema.parameters.forEach((param) => {
  //     if (param.in === 'path') {
  //       requestParams[param.name] = request.openapi.pathParams[param.name];
  //     } else if (param.in === 'query') {
  //       requestParams[param.name] = request.query[param.name];
  //     } else if (param.in === 'header') {
  //       requestParams[param.name] = request.headers[param.name];
  //     }
  //   });
  //   return requestParams;
  // }



  static async collectRequestParams(request) {
    const requestParams = {}
    if (request.openapi.schema.requestBody) {
      const { content } = request.openapi.schema.requestBody
      if (content['application/json'] !== undefined) {
        const requestBodyName = camelCase(this.getRequestBodyName(request))
        requestParams[requestBodyName] = request.body
      } else if (content['multipart/form-data'] !== undefined) {
        Object.keys(content['multipart/form-data'].schema.properties).forEach((property) => {
          const propertyObject = content['multipart/form-data'].schema.properties[property]
          if (propertyObject.format !== undefined && propertyObject.format === 'binary') {
            requestParams[property] = this.collectFile(request, property)
          } else {
            requestParams[property] = request.body[property]
          }
        })
      }
    }

    if (request.openapi.schema.parameters) {
      request.openapi.schema.parameters.forEach((param) => {
        if (param.in === 'path') {
          requestParams[param.name] = request.openapi.pathParams[param.name]
        } else if (param.in === 'query') {
          requestParams[param.name] = request.query[param.name]
        } else if (param.in === 'header') {
          requestParams[param.name] = request.headers[param.name]
        }
      })
    }
    return requestParams
  }


  static async handleRequest (request, response, serviceOperation) {
    try {
      const parameters = await this.collectRequestParams(request)
      const serviceResponse = await serviceOperation(parameters, response)
      Controller.sendResponse(response, serviceResponse)
    } catch (error) {
      const { status, message } = error
      response.status(status || 500).json({ message })
    }
  }
}

module.exports = Controller;
