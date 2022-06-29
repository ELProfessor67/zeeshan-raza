const express = require("express");
const router = express.Router();
const { loginAdmin, logoutAdmin, adminUpdate, changePassword, loadAdmin} = require("../controller/Admin");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/adminLogin").post(loginAdmin);
router.route("/adminLogout").get(isAuthenticated, logoutAdmin);
router.route("/adminUpdate/:_id").put(isAuthenticated, adminUpdate);
router.route("/changePassword").put(isAuthenticated, changePassword);
router.route("/loadAdmin").get(isAuthenticated, loadAdmin);
// router.route("/create").post(create);

module.exports = router;