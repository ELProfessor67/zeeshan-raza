const app = require("./app");
const { connectDatabase } = require("./config/Database");
const cloudinary = require('cloudinary');
// connect database function
connectDatabase();

// cloudinary configure
cloudinary.config({ 
  cloud_name : process.env.cloud_name, 
  api_key : process.env.api_key, 
  api_secret : process.env.api_secret
});

app.listen(process.env.PORT,() => {
	console.log("server listing on port 4000");
});

 // "proxy": "http://localhost:4000",
