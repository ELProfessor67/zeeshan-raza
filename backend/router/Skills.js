const express = require("express");
const router = express.Router();
const { createSkills, getSkills, updateSkills, deleteSkills } = require("../controller/Skills");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/skills").post(isAuthenticated, createSkills);
router.route("/skills").get(getSkills);
router.route("/skills/:_id").put(isAuthenticated, updateSkills);
router.route("/skills/:_id").delete(isAuthenticated, deleteSkills);

module.exports = router;