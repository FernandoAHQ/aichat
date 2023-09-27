const { Router } = require('express');
const { date } = require('../controllers/date.controllers')


const router = Router();


router.get('/today',date)

module.exports = router;