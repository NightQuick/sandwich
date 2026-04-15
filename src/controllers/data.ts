import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface JsonData {
  menu: { category: string; [key: string]: unknown }[];
  [key: string]: unknown;
}

const settings: Record<string, string> = {
  size: 'sizes',
  bread: 'breads',
  vegetable: 'vegetables',
  sauce: 'sauces',
  filling: 'fillings',
  finish: 'ready'
};

let jsonData: JsonData | null = null;

function loadJSON() {
  try {
    const dataPath = join(__dirname, '../../public/data.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    jsonData = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error: can't read data.json\n\n${error}`);
  }
}

export const getAllPositions = (req: Request, res: Response) => {
  if (!jsonData) loadJSON();
  const { category } = req.params;
  const positions = jsonData!.menu.filter((product) => product.category === category);
  res.json(positions);
};

export const getAllIngredients = (req: Request, res: Response) => {
  if (!jsonData) loadJSON();
  const category = req.params.category as string;

  if (!settings[category]) {
    return res.status(400).json({ error: 'Неверная категория' });
  }

  const data: Record<string, unknown> = JSON.parse(JSON.stringify((jsonData as any)[settings[category]]));
  for (const comp in data) {
    (data[comp] as Record<string, unknown>).id = comp;
  }
  res.json(data);
};
