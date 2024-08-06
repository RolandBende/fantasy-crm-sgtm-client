/**
 * Include modules aka. sGTM APIs
 * @see https://developers.google.com/tag-platform/tag-manager/server-side/api
 */
const claimRequest = require('claimRequest');
const getRequestMethod = require('getRequestMethod');
const getRequestPath = require('getRequestPath');
const getRequestBody = require('getRequestBody');
const JSON = require('JSON');
const getType = require('getType');
const runContainer = require('runContainer');
const setResponseStatus = require('setResponseStatus');
const setResponseBody = require('setResponseBody');
const returnResponse = require('returnResponse');
const logToConsole = require('logToConsole');

// Decide whether logging is enabled
const log = data.loggingIsEnabled ? logToConsole : (() => { return undefined; });

// Do some basic logging for debuging purpose
log("Client template settings: ", data);
log("Request method: ", getRequestMethod());
log("Request body: ", getRequestBody());

// Decide whether the Client is allowed to claim the request
if (getRequestPath() === data.path && getRequestMethod() === 'POST') {

    // Claim the request
    claimRequest();

    // Convert HTTP request body to event object
    const parsedRequestBody = JSON.parse(getRequestBody());

    // Do some very basic validation
    let requestBodyIsValid = true;
    if (getType(parsedRequestBody) !== 'object') { requestBodyIsValid = false; }
    if (!parsedRequestBody.id) { requestBodyIsValid = false; }
    if (!parsedRequestBody.email) { requestBodyIsValid = false; }
    if (!parsedRequestBody.revenue) { requestBodyIsValid = false; }

    // Decide whether the request body is valid
    if (requestBodyIsValid) {
        // Create the event object for the container
        const event = parsedRequestBody;
        event.event_name = data.eventName;
        // Run the container with the event & return response
        runContainer(event, () => returnResponse());
    } else {
        // Create an error message
        const errorMessage = "Invalid request payload";
        // Log error
        log(errorMessage);
        // Send error response
        setResponseStatus(422);
        setResponseBody(errorMessage);
        returnResponse();
    }

}