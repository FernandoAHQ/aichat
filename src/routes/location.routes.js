const { Router } = require('express');
const { check } = require('express-validator');
const { register, gerAllLocation, aLocation } = require('../controllers/location.controllers')
const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();

router.post('/register', [
    check('date', 'El date es requerido.').not().isEmpty(),
    check('category', 'El category es requerido.').not().isEmpty(),
    check('name', 'El date es requerido.').not().isEmpty(),
    check('description', 'El category es requerido.').not().isEmpty(),
    check('isBulding', 'El description es requerido.').not().isEmpty(),
    check('images', 'El images es requerido.').not().isEmpty(),
    check('map', 'El map es requerido.').not().isEmpty(),
    check('clases', 'El clases es requerido.').not().isEmpty(),
    check('horario', 'El horario es requerido.').not().isEmpty(),
    check('clave', 'El clave es requerido.').not().isEmpty(),
    validarCampos
], register);

router.get('/all',gerAllLocation);


router.get('/:id',aLocation)

module.exports = router;