const express = require("express");
const router = express.Router();
const { createMessage, getMessage, deleteMessage } = require("../controller/Message");
const { isAuthenticated } = require("../middlewears/auth");

router.route("/message").post(createMessage);
router.route("/message").get(isAuthenticated, getMessage);
// router.route("/message/:_id").put(updateMessage);
router.route("/message/:_id").delete(isAuthenticated , deleteMessage);

module.exports = router;