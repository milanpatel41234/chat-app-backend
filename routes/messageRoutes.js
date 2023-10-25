const {Router} = require('express');
const router = Router();
const messageController = require('../controllers/messageController')


router.post('/', messageController.postMessage)

module.exports = router