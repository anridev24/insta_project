const { Router } = require('express')
const router = Router()

const AccountController = require('../controllers/SearchController')

router.get('/search/:keyword', AccountController.get_results_get)

module.exports = router
