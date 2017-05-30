'use strict';
var config = require('./EmailConfig.js');
var nodemailer = require('nodemailer');

class Mailer {
	constructor(to, subject, text)
	{
		this.transporter = nodemailer.createTransport({
			service: "Zoho",
			auth: {
				user: config.name,
				pass: config.pass
			}
		});

		this.mailOptions = {
			from: config.name,
			to: to,
			subject: subject,
			text: text
		};
	}

	html(html)
	{
		this.mailOptions.html = html;
	}

	resetTo(to)
	{
		this.mailOptions.to = to;
	}

	resetSubject(subject)
	{
		this.mailOptions.subject = subject;
	}

	resetText(text)
	{
		this.mailOptions.text = text;
	}

	resetAll(to, subject, text, html)
	{
		this.mailOptions.to = to;
		this.mailOptions.subject = subject;
		this.mailOptions.text = text;
		this.mailOptions.html = html;
	}

	sendMail()
	{
		this.transporter.sendMail(this.mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("Message sent");
		});
	}
};

module.exports = Mailer;
