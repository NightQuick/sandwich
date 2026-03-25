import express from 'express';
import { getAllPositions, getAllIngredients } from '../controllers/data.js';

const router = express.Router();

router.get('/', getAllIngredients); //Список всех ингридиентов
router.get('/:category', getAllPositions); //Получить список позиций по типу

export default router;
