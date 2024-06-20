/**
 * Include modules aka. sGTM APIs
 * @see https://developers.google.com/tag-platform/tag-manager/server-side/api
 */
const claimRequest = require('claimRequest');
const getRequestMethod = require('getRequestMethod');
const getRequestPath = require('getRequestPath');
const getRequestBody = require('getRequestBody');
const JSON = require('JSON');
const runContainer = require('runContainer');
const returnResponse = require('returnResponse');
const logToConsole = require('logToConsole');

// Determine if the Client is allowed to claim the request
if (getRequestPath() === data.path && getRequestMethod() === 'POST') {

    // Claim the request
    claimRequest();

    // Build the Event Data object
    const event = JSON.parse(getRequestBody());
    event.event_name = data.eventName;

    // Run the container with the event & return response
    runContainer(event, () => returnResponse());

}