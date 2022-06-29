 const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
	comment : {
		type : String,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	avatar :{
		public_id :{
			type : String,
			required : true
		},
		url : {
			type : String,
			required : true
		}
	},
	Work : {
		type : String,
		required : true
	}
});

module.exports = model("Post",PostSchema);