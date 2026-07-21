import Router from 'express';
import { loginUser, logout, refreshSession, register } from '../controllers/auth.js';

const router = Router();

router.post('/autorization/login', loginUser);
router.post('/autorization/refreshToken', refreshSession);
router.post('/autorization/registration', register);
router.post('/autorization/logout', logout);

export default router;
