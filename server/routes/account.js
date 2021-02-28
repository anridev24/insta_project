const { Router } = require('express')
const router = Router()

const AccountController = require('../controllers/AccountController')

router.post('/register', AccountController.register_post)
router.post('/login', AccountController.login_post)
router.post('/saved_content', AccountController.saved_content_post)
router.post('/account_info', AccountController.accoun_info_post)
router.post('/save', AccountController.save_post)
router.post('/delete', AccountController.delete_post)
module.exports = router
