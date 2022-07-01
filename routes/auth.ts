import { Router } from 'express';

import { login, revalidarToken } from '../controllers/auth';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.post('/login', login);

router.get('/renew', validarJWT, revalidarToken);



export default router;