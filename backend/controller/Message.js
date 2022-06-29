const Message = require("../models/Messages");
const { isEmail } = require('validator');
// const { sendMail, sendSMS } = require('../middlewears/sendEmail');
// const Admin = require('../models/Admin');

exports.createMessage = async (req,res) => {
	try {

		const { Email } = req.body;

		// email validation
		if(!isEmail(Email)){
			return res.status(400).json({
				success : false,
				message : "Email is not valide"
			});
		}

		// save data message
		await Message.create(req.body);

		res.status(201).json({
			success : true,
			message : "Your Message Send Sucessfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.getMessage = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin get Message"
			});
		}
		const skillData = await Message.find();
		res.status(200).send(skillData);
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

// exports.updateMessage = async (req,res) => {
// 	try {

// 		await Message.findByIdAndUpdate(req.params._id,req.body);
// 		res.status(200).json({
// 			success : true,
// 			message : "Message update successfully"
// 		});
// 	}catch(err){
// 		res.status(500).json({
// 			success : false,
// 			message : err.message
// 		});
// 	}
// }

exports.deleteMessage = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin delete Message"
			});
		}
		await Message.findByIdAndDelete(req.params._id);
		res.status(200).json({
			success : true,
			message : "Message delte successfully"
		})
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}