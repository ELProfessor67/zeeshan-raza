const Skills = require("../models/Skills");

exports.createSkills = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin create Skills"
			});
		}
		await Skills.create(req.body);
		res.status(201).json({
			success : true,
			message : "Skill Insert Sucessfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.getSkills = async (req,res) => {
	try {
		const data = await Skills.find();
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

exports.updateSkills = async (req,res) => {
	try {

		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update Skills"
			});
		}

		const data = req.body;

		// delete empty field
		Object.keys(data).forEach((keys) => {
			data[keys] == "" || data[keys] == " " || data[keys] == "  " || data[keys] == "   "? delete data[keys] : data[keys] = data[keys];
		});

		await Skills.findByIdAndUpdate(req.params._id,data);
		res.status(200).json({
			success : true,
			message : "skill update successfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.deleteSkills = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin delete Skills"
			});
		}

		await Skills.findByIdAndDelete(req.params._id);
		res.status(200).json({
			success : true,
			message : "Skill delte successfully"
		})
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}