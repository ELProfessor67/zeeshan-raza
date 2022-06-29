const Count = require("../models/Count");

exports.createCount = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin create Count"
			});
		}
		await Count.create(req.body);
		res.status(201).json({
			success : true,
			message : "Count Insert Sucessfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.getCount = async (req,res) => {
	try {
		const data = await Count.find();
		res.status(200).json({
			success : true,
			data
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.updateCount = async (req,res) => {
	try {

		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update Count"
			});
		}

		const data = req.body;

		// delete empty field
		Object.keys(data).forEach((keys) => {
			data[keys] == "" || data[keys] == " " || data[keys] == "  " || data[keys] == "   "? delete data[keys] : data[keys] = data[keys];
		});

		await Count.findByIdAndUpdate(req.params._id,data);
		res.status(200).json({
			success : true,
			message : "count update successfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.deleteCount = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin delete Count"
			});
		}

		await Count.findByIdAndDelete(req.params._id);
		res.status(200).json({
			success : true,
			message : "count delete successfully"
		})
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}