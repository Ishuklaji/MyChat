const express = require('express')
const { registerUser, authUser, allusers } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route("/").post(registerUser).get(protect, allusers)
router.post("/login", authUser)

module.exports = router