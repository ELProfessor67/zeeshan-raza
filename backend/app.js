const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { join, resolve } = require("path");
require("dotenv").config({ path: join(__dirname,"./config/config.env") });


// routers
const skill = require("./router/Skills");
const Project = require("./router/Project");
const Post = require("./router/Post");
const Message = require("./router/Message");
const Admin = require("./router/Admin");
const Count = require('./router/count')


// set middlewares
app.use(express.json({ limit:"50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended:false }));
app.use(cookieParser())
app.use(cors({
	origin : "http://localhost:3000"
}));



// importing routers
app.use("/api/v1",skill);
app.use("/api/v1",Project);
app.use("/api/v1",Post);
app.use("/api/v1",Message);
app.use("/api/v1",Admin);
app.use("/api/v1",Count);

//set header 
app.use(function (req, res, next) {  
  res.header("X-powered-by", "I don't tell");
  res.header("Server", "I don't tell");
  next();
});


// render file
app.use(express.static(join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "../frontend/build/index.html"));
});

// app.get("/",(req,res)=>{
// 	res.send("hello world");
// });

module.exports = app;
