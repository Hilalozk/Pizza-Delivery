const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const auth = require('../middleware/auth');
//api/auth/something/..
router.post('/register', authController.register);
router.post('/signIn', authController.signIn);
router.get('/isAuth', auth(), authController.isAuth);


module.exports = router;