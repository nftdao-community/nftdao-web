var express = require('express');
var router = express.Router();

const userController = require('../apps/user/userController');

/* GET users listing. */
router.get('/getUser/:klaytnAddress', userController.getUser)
router.post('/createUser', userController.createUser)

module.exports = router;
