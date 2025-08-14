const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUsers } = require ("../controllers/authControllers")
const auth = require('../middleware/auth');
const role = require('../middleware/role');


router.get('/users', auth, role('admin'), getUsers)
router.post("/register", registerUser)
router.post("/login", loginUser)



module.exports = router;