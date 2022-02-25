const { Router } = require('express');

const { check } = require('express-validator');
const { login, revalidarToken } = require('../controllers/auth');
//const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', login);

router.get('/auth/renew',  revalidarToken);



module.exports = router;