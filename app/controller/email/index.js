'use strict';
var nodemailer = require('nodemailer');
const auth = require('./../../config/auth.json');

class Mailer {
	constructor(to, subject, text)
	{
		this.transporter = nodemailer.createTransport({
			host: 'smtp.zoho.com',
			port: 465,
			secure: true,
			auth: {
				user: auth.emailer.email,
				pass: auth.emailer.password
			}
		});

		this.mailOptions = {
			from: 'contact@communicode.co',
			to: to,
			subject: subject,
			text: text
		};
		return this;
	}

	html(html)
	{
		this.mailOptions.html = html;
		return this;
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
		});
	}
};

export default Mailer;
