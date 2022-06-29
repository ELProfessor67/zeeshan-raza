const { Schema, model } = require("mongoose");

const CountSchema = new Schema({
	name : {
		type : String,
		required : true,
	},
	count : {
		type : Number,
		required : true
	}
});

module.exports = model("Count",CountSchema);