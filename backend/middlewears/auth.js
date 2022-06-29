const Admin = require("../models/Admin");
const { verify } = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        success : false,
        message: "only admin access this page"
      });
    }

    const decoded = await verify(token, process.env.secret_key);

    const admin = await Admin.findById(decoded._id);

    if(!admin.tokens.includes(token)){
      return res.status(401).json({
        success : false,
        message : "cookie has expired"
      });
    }

    // console.log(decoded);

    req.admin = admin;

    // console.log(admin);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
