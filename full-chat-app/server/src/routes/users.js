const {Router} = require('express');
const { validarJWT} = require('../middlewares/validar-jwt.js')
const { getUsers } = require('../controllers/user.js');

const router = Router()

router.get('/', validarJWT, getUsers)

module.exports = router