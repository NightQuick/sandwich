import { Request, Response } from 'express';
import { getDB } from '../db.js';

export async function getAllIngredients(req: Request, res: Response) {
  const db = getDB();
  const category = req.params.category as string;

  const ingredients = await db.collection("ingredients").find({ type: category }).toArray();
  res.json(ingredients);
}

export async function getAllPositions(req: Request, res: Response) {
  const db = getDB();
  const category = req.params.category as string;

  const positions = await db.collection("products").find({ category }).toArray();
  res.json(positions);
}