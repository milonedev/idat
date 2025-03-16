const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/new', [
    check('name', 'The field name is required').not().isEmpty(),
    check('password', 'The field password is required').not().isEmpty(),
    check('email', 'The field email is required').not().isEmpty(),
    validarCampos
], createUser)

router.post('/', [
    check('password', 'The field name is required').not().isEmpty(),
    check('email', 'The field name is required').not().isEmpty(),
    validarCampos
], login)

router.post('/renew', validarJWT, renewToken)


module.exports = router;