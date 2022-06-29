const express = require("express");
const router = express.Router();
const { createCount, getCount, updateCount, deleteCount } = require("../controller/count");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/count").post(isAuthenticated, createCount);
router.route("/count").get(getCount);
router.route("/count/:_id").put(isAuthenticated, updateCount);
router.route("/count/:_id").delete(isAuthenticated, deleteCount);

module.exports = router;