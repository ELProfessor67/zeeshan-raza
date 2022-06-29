const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
	Name : {
		type : String,
		required : true
	},
	Avatar : {
		public_id :{
			type : String,
			required : true
		},
		url : {
			type : String,
			required : true
		}
	},
	Username : {
		type : String,
		required : true
	},
	Password : {
		type : String,
		required : true,
		select : false,
		min : [8,"password to shot"],
		max : [20,"password to long"]
	},
	tokens : [String]
});

AdminSchema.pre("save",async function (next) {
	try {
		if(this.isModified("Password")){
			this.Password = await hash(this.Password,10);
		}
		next();
	}catch(err){
		console.log(err.message);
	};
});

AdminSchema.methods.matchPassword = async function(Password){
	try {
		return await compare(Password,this.Password);
	}catch(err){
		console.log(err.message);
	}
}

AdminSchema.methods.genToken = async function(){
	try {
		const token = sign({_id : this._id},process.env.secret_key);
		this.tokens.concat(token);
		await this.save();
		return token;
	}catch(err){
		res.status(500).json({
			success : false,
			message : err.message
		});
	}
}


module.exports = mongoose.model("Admin",AdminSchema);