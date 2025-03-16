const {Router} = require('express');
const { validarJWT} = require('../middlewares/validar-jwt.js')
const { getChat } = require('../controllers/message.js');

const router = Router()

router.get('/:from', validarJWT, getChat)

module.exports = router