const mongoose = require("mongoose");

exports.connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.database);
		console.log("Database connect sucessfully");
	}catch(err){
		console.log("No Database connection");
	}
}
