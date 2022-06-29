const express = require("express");
const router = express.Router();
const { createPost, getPost, updatePost, deletePost } = require("../controller/Post");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/post").post(isAuthenticated, createPost);
router.route("/post").get(getPost);
router.route("/post/:_id").put(isAuthenticated, updatePost);
router.route("/post/:_id").delete(isAuthenticated, deletePost);

module.exports = router;