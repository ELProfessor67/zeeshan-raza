const Admin = require("../models/Admin");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { isEmail } = require('validator');
const cloudinary = require('cloudinary');

const comaprePass = async function (Password,DataPassword) {
  return await compare(Password, DataPassword);
};

const genToken = async (_id) => {
	try {
		 return sign({_id}, process.env.secret_key);
	}catch(err){
		console.log(err.message);
	}
}

exports.loginAdmin = async (req,res) => {
	try {
		const { Username, Password } = req.body;
		// console.log(Username)
		const admin = await Admin.findOne({Username}).select("+Password");

		if(!admin){
			return res.status(400).json({
				success : false,
				message : "Invalid details"
			});
		}

		const isMatch = await comaprePass(Password,admin.Password);

		if(!isMatch){
			return res.status(400).json({
				success : false,
				message : "Invalid details"
			});
		}

		const token = await genToken(admin._id);
		// console.log(token);

		// save tokens in database
		if(!admin.tokens.includes(token)){
			admin.tokens.push(token);
			await admin.save();
		}
		
		const options = {
      		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      		httpOnly: true,
    	};

    	res.status(200).cookie("token", token, options).json({
      		success: true,
      		admin,
      		token,
    	});
		
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.logoutAdmin = async (req,res) => {
	try {
		const { token } = req.cookies; 

		if(token){
			const admin = await Admin.findById(req.admin._id);
			admin.tokens = admin.tokens.filter((saveToken) => {
				return token != saveToken;
			});
			await admin.save();
		}

    	res
      .status(200)
      .clearCookie("token")
      .json({
        success: true,
        message: "Logged out",
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


exports.adminUpdate = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update this profile"
			});
		}

		const data = req.body;

		const admin = await Admin.findById(req.params._id);

		// delete empty field
		Object.keys(data).forEach((keys) => {
			data[keys] == "" || data[keys] == " " || data[keys] == "  " || data[keys] == "   "? delete data[keys] : data[keys] = data[keys];
		});

		if(data.Avatar == admin.Avatar.url)
		{
			delete data.Avatar;
		}else{
			await cloudinary.v2.uploader.destroy(admin.Avatar.public_id);
			const result = await cloudinary.v2.uploader.upload(data.Avatar,{
				folder : "admin"
			});

			data.Avatar = {
				public_id : result.public_id,
				url : result.secure_url
			}
		}

		// if(data.hasOwnProperty('Email')){

		// 	if(!isEmail(data.Email)){
		// 		return res.status(401).json({
		// 			success : false,
		// 			message : "Invalid Email"
		// 		});
		// 	}

		// }

		delete data.Password;

		await Admin.findByIdAndUpdate(req.params._id,data);

		res.status(200).json({
			success : true,
			message : "profile update successfully"
		});

	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.changePassword = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update this profile"
			});
		}
		const {newPassword, oldPassword} = req.body;

		const admin = await Admin.findById(req.admin._id).select("+Password");

		const isMatch = await comaprePass(oldPassword, admin.Password);

		// console.log(isMatch);

		if(!isMatch){
			return res.status(400).json({
				success : false,
				message : "Invalid oldPassword"
			});
		}


		admin.Password = newPassword;
		await admin.save();

		res.status(200).json({
			success : true,
			message : "Password change successfully"
		}); 

	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.loadAdmin = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin access dashboard"
			});
		}

		res.status(200).json({
			success : true,
			admin : req.admin
		});

	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

// exports.create = async (req,res) => {
// 	try {
// 		const data = req.body;
// 		await Admin.create(data);
// 		res.send("create")
// 	}catch(err){
// 		res.send(err.message)
// 	}
// }