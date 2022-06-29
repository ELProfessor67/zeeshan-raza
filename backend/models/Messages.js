const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
	Name : {
		type : String,
		required : true
	},
	Email : {
		type : String,
		required : true
	},
	Subject : {
		type : String,
		required : true
	},
	Message : {
		type : String,
		required : true
	},
	Date : {
		type : Date,
		default : Date.now()
	}
});

module.exports = model("Message",MessageSchema);