import { Router } from 'express';
import { check } from 'express-validator';

import { esCargoValido, esNombreUsuarioValido } from '../helpers/db-validators-auth';

import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { crearUsuario, login, revalidarToken, getUsuarios } from '../controllers/auth';

const router = Router();

router.post('/login', login);

router.get('/renew', validarJWT, revalidarToken);

router.post('/usuarios/crear',
  validarJWT,
  check('idCargo').custom(esCargoValido),
  check('nombreUsuario').custom(esNombreUsuarioValido),
  validarCampos,
  crearUsuario
);


router.get('/usuarios',
  validarJWT,
  getUsuarios
)



export default router;