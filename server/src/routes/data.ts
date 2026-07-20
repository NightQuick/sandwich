import Router from 'express';
import { getAllPositions, getAllIngredients } from '../controllers/data.js';

const router = Router();

router.get('/ingredients/:category', getAllIngredients);
router.get('/sandwiches/:category', getAllPositions);

export default router;
