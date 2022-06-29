const { createTransport } = require('nodemailer');
const Vonage = require('@vonage/server-sdk');
const Admin = require('../models/Admin');

const transport = createTransport({
	host : "smtp.gmail.com",
	port : 465,
	secure : true,
	auth : {
		user : process.env.user,
		pass : process.env.pass
	}
});

const vonage = new Vonage({
	apiKey : process.env.apiKey,
	apiSecret : process.env.apiSecret
});


exports.sendMail = async (to,subject,text) => {
	try {
		const mailOption = {
			from : process.env.user,
			to,
			subject,
			text
		}

		transport.sendMail(mailOption,(err,info)=>{
			err ? console.log(err) : console.log(info.response);;
		});
	}catch(err){
		console.log(err.message);
	}
	
}


exports.sendSMS = async (text) => {
	const admin = await Admin.find();
	const phone = admin[0].Phone;
	// console.log(phone);
	vonage.message.sendSms("Vonage APIs",phone,text,(err,info) => {
		err ? console.log(err) : info.messages[0].status === '0' ? console.log("sms send successfully") : console.log("sms send failed");
	});
}
