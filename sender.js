'use strict';

//establishing the required tokens
const client = require('twilio')(
  "ACCOUNT_SID", //found on the Twilio acount dashboard
  "ACCOUNT_TOKEN" //just below the ACCOUNT_SID on the dashboard
);

class Sender {
  //method that sends texts to a specified phone number with a body
  sendSMS(message) {
     client.messages.create({
      from: "+13334445566", //Your twillio phone number here, current number is a placeholder
      to  : message.to,
      body: message.body
     }, function(err, message) {
       if(err) {
         console.error(err.message);
       }
     });
	}
};

module.exports = new Sender();
