const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewJWT, register } = require('../controllers/auth.controllers.js');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWT} = require('../middlewares/validar-jwt.middleware');


const router = Router();


router.post('/login', [
    check('No_control', 'El username es requerido.').not().isEmpty(),
    check('password', 'El password es requerido.').not().isEmpty(),
    validarCampos
], login);

router.post('/register', [
    check('name', 'El name es requerido.').not().isEmpty(),
    validarCampos
], register);


router.get('/renew', validarJWT, renewJWT);



module.exports = router;