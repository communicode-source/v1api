import request from 'request-promise';

export default function sendEmail(toEmail, email, data) {

  /*const options = {
    url: 'https://us-central1-communicode-167922.cloudfunctions.net/sendEmail?sg_key=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',
    to: toEmail,
    from: email.from,
    subject: email.subject,
    templateId: email.templateId,
    data: data,
    headers: {'content-type' : 'application/json'},
  };*/

  var options = {
      method: 'POST',
      uri: 'https://us-central1-communicode-167922.cloudfunctions.net/sendEmail?sg_key=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',
      body: {
        to: toEmail,
        from: email.from,
        subject: email.subject,
        templateId: email.templateId,
        data: data,
      },
      json: true // Automatically stringifies the body to JSON
  };

  return request.post(options);
}
