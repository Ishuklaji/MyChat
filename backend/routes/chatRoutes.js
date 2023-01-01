const express = require('express');
const { protect } = require('../middlewares/authMiddleware');

const router = express.router();

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChat)
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);