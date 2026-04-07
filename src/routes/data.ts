import express from 'express';
import { getAllPositions, getAllIngredients } from '../controllers/data.js';

const router = express.Router();

router.get('/ingredients/:category', getAllIngredients);
router.get('/sandwiches/:category', getAllPositions);

export default router;
