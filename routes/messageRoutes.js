const {Router} = require('express');
const router = Router();
const messageController = require('../controllers/messageController')


router.post('/', messageController.postMessage)
router.get('/', messageController.getMessage)

module.exports = router