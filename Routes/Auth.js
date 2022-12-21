const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../Controllers/userController');

//register
router.post('/register', registerUser);

//Login
router.post('/login', loginUser);

module.exports = router;
