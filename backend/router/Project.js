const express = require("express");
const router = express.Router();
const { createProject, getProject, updateProject, deleteProject } = require("../controller/Project");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/projects").post(isAuthenticated, createProject);
router.route("/projects").get(getProject);
router.route("/projects/:_id").put(isAuthenticated, updateProject);
router.route("/projects/:_id").delete(isAuthenticated, deleteProject);

module.exports = router;