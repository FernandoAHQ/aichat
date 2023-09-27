const { Router } = require('express');
const { check } = require('express-validator');
const { newMessage } = require('../controllers/chat.controllers.js');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWT} = require('../middlewares/validar-jwt.middleware');


const router = Router();


router.post('/new', [
    check('message', 'El message es requerido.').not().isEmpty(),
    check('user', 'El user es requerido.').not().isEmpty(),
    validarCampos
], newMessage);






module.exports = router;