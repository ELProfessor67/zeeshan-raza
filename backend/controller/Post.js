const Post = require("../models/Post");
const cloudinary = require('cloudinary');

exports.createPost = async (req,res) => {
	try {
		// console.log(req.admin)
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin create post"
			});
		}

		if(req.body.avatar){
			const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
				folder : "post"
			});

			req.body.avatar = {
				public_id : result.public_id,
				url : result.secure_url
			}
		}else{
			req.body.avatar = {
				public_id : "no yet",
				url : "not yet"
			}
		}

		await Post.create(req.body);
		res.status(201).json({
			success : true,
			message : "Post Insert Sucessfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.getPost = async (req,res) => {
	try {
		const postData = await Post.find();
		res.status(200).send(postData);
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.updatePost = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin update Post"
			});
		}

		const data = req.body;

		const curPost = await Post.findById(req.params._id);
		
		// delete empty field
		Object.keys(data).forEach((keys) => {
			data[keys] == "" || data[keys] == " " || data[keys] == "  " || data[keys] == "   "? delete data[keys] : data[keys] = data[keys];
		});


		if(data.avatar == curPost.avatar.url){
			delete data.avatar;
		}else{
			await cloudinary.v2.uploader.destroy(curPost.avatar.public_id);
			const result = await cloudinary.v2.uploader.upload(data.avatar,{
				folder : 'post'
			});

			data.avatar = {
				public_id : result.public_id,
				url : result.secure_url
			}
		}


		await Post.findByIdAndUpdate(req.params._id,data);

		res.status(200).json({
			success : true,
			message : "Post update successfully"
		});
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}

exports.deletePost = async (req,res) => {
	try {
		if(!req.admin){
			return res.status(400).json({
				success : false,
				message : "only admin delete post"
			});
		}
		const curPost = await Post.findById(req.params._id);
		// delete image
		await cloudinary.v2.uploader.destroy(curPost.avatar.public_id);
		await Post.findByIdAndDelete(req.params._id);
		res.status(200).json({
			success : true,
			message : "Post delte successfully"
		})
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}