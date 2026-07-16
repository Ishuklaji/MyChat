const express = require("express")
const { sendMessage, allMessages, toggleReaction } = require("../controllers/messageControllers")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)
router.route('/:messageId/react').put(protect, toggleReaction)

module.exports = router