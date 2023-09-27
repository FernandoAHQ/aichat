const { Router } = require('express');
const { check } = require('express-validator');
const { converse } = require('../controllers/openai.controllers')
const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();

router.post('/converse', [
    check('question', 'El date es requerido.').not().isEmpty(),
    check('location', 'El date es requerido.').not().isEmpty(),
    validarCampos
], converse);





module.exports = router;