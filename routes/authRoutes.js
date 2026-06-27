const express = require("express");
const router = express.Router();
const { validate, validationRules } = require("../validators/validationRules");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
//Register 
router.post('/register', validationRules(), validate, registerUser);
//login
router.post('/login', validationRules(), validate, loginUser);
//logut
router.get('/logout', logoutUser);

module.exports = router;