import Router from 'express';
import {} from '../controllers/auth.js';

const router = Router();

router.get('/ingredients/:category');
router.get('/sandwiches/:category');

export default router;
