const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
	Link:{
		type : String,
		required : true
	},
	Image:{
		public_id :{
			type : String,
			required : true
		},
		url : {
			type : String,
			required : true
		}
	},
	Number:{
		type : Number,
		required : true,
		unique : true
	},
	Category:{
		type : String,
		required : true,
		enum : ['website','design','python']
	}
});

module.exports = model("Project",ProjectSchema);