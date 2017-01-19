'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const urls = process.env.URLS.split(/[ ,]+/);

urls.forEach((url) => {
  fetch(url)
  .then((response) => {
    let status = response.status;
    if(/(40\d)|(50\d)/.test(status)) {
      sendEmail(url, status);
    }
  })
  .catch((error) => {
    sendEmail(url, error);
  })
})

function sendEmail(url, error) {
  let message = `<html><p>Go fix ${url}</p>${error && `<p>Error:</p><p>${error}</p>`}</html>`
  let request = sg.emptyRequest()
  request.body = {
    "content": [
      {
        "type": "text/html", 
        "value": message
      }
    ], 
    "from": {
      "email": process.env.SENDGRID_USERNAME, 
      "name": process.env.SENDER_NAME || 'Availability Checker'
    }, 
      "personalizations": [
      {
        "subject": `Page Down! ${url}`, 
        "to": process.env.EMAILS.split(/[ ,]+/).map((email) => {
          return { "email": email }
        }),
      }
    ],
    "headers": {}, 
  };
  request.method = 'POST'
  request.path = '/v3/mail/send'
  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    console.log(error);
  });
}