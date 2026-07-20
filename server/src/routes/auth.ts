import Router from 'express';
import { loginUser, refreshSession } from '../controllers/auth.js';

const router = Router();

router.post('/autorization/login', loginUser);
router.post('/autorization/refreshToken', refreshSession);

export default router;
