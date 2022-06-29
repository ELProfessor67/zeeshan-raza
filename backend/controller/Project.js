const Project = require("../models/Project");
const cloudinary = require('cloudinary');

exports.createProject = async (req,res) => {
	try {

		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin create project"
			});
		}

		// upload image on cloudinary
		if(req.body.Image){
			const result = await cloudinary.v2.uploader.upload(req.body.Image,{
				folder : "project"
			});

			req.body.Image = {
				public_id : result.public_id,
				url : result.secure_url
			}
		}

		await Project.create(req.body);
		res.status(201).json({
			success : true,
			message : "Project Insert Sucessfully"
		});

	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.getProject = async (req,res) => {
	try {
		const projectData = await Project.find();
		res.status(200).send(projectData);
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.updateProject = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update project"
			});
		}

		const data = req.body;

		// delete empty field
		Object.keys(data).forEach((keys) => {
			data[keys] == "" || data[keys] == " " || data[keys] == "  " || data[keys] == "   "? delete data[keys] : data[keys] = data[keys];
		});

		const curPro = await Project.findById(req.params._id);

		if(curPro.Image.url == data.Image){
			delete data.Image
		}else{
			await cloudinary.v2.uploader.destroy(curPro.Image.public_id);

			const result = await cloudinary.v2.uploader.upload(data.Image,{
				folder : "project"
			});

			data.Image = {
				public_id : result.public_id,
				url : result.secure_url
			}
		}

		await Project.findByIdAndUpdate(req.params._id,data);
		res.status(200).json({
			success : true,
			message : "Project update successfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.deleteProject = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin delete project"
			});
		}

		const curProject = await Project.findById(req.params._id);
		await cloudinary.v2.uploader.destroy(curProject.Image.public_id);

		await Project.findByIdAndDelete(req.params._id);
		res.status(200).json({
			success : true,
			message : "Project delte successfully"
		})
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}