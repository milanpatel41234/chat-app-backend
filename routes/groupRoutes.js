const {Router} = require('express');
const router = Router();
const groupController = require('../controllers/groupController')


router.post('/', groupController.postGroup);
router.get('/',groupController.getGroup);;
router.post('/addmember',groupController.addMember);

module.exports = router