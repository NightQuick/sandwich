import Router from 'express';
import { loginUser, refreshSession } from '../controllers/auth.js';

const router = Router();

router.get('/autorization/login', loginUser);
router.get('/autorization/refreshToken', refreshSession);

export default router;
