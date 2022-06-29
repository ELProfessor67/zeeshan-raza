const { Schema, model } = require("mongoose");

const SkillsSchema = new Schema({
	Name : {
		type : String,
		required : true,
		unique : [true,"This skills is already exists"]
	},
	Percentage : {
		type : Number,
		required : true
	}
});

module.exports = model("Skill",SkillsSchema);