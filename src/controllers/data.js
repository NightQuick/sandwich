import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let jsonData;
const settings = {
  size: {
    name: 'Размер',
    object: 'sizes',
    title: 'Выберите размер сендвича'
  },
  bread: {
    name: 'Хлеб',
    object: 'breads',
    title: 'Хлеб для сендвича на выбор'
  },
  vegetable: {
    name: 'Овощи',
    object: 'vegetables',
    title: 'Дополнительные овощи бесплатно',
    multiple: true
  },
  sauce: {
    name: 'Соус',
    object: 'sauces',
    title: 'Выберите 3 бесплатных соуса по вкусу',
    multiple: true
  },
  filling: {
    name: 'Начинка',
    object: 'fillings',
    title: 'Добавьте начинку по вкусу',
    multiple: true
  },
  finish: {
    name: 'Готово!',
    object: 'ready',
    title: 'Проверьте и добавьте в корзину'
  }
};
function loadJSON() {
  try {
    const dataPath = join(__dirname, '../../public/data.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    jsonData = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error:can't read data.json\n\n${error}`);
  }
}

export const getAllPositions = (req, res) => {
  if (!jsonData) loadJSON();
  const { category } = req.params;
  const positions = [];
  jsonData.menu.forEach((product) => {
    if (product.category === category) {
      positions.push(product);
    }
  });
  res.json(positions);
};

export const getAllIngredients = (req, res) => {
  if (!jsonData) loadJSON();
  const { category } = req.params;

  if (!settings[category]) {
    return res.status(400).json({ error: 'Неверная категория' });
  }

  const data = JSON.parse(JSON.stringify(jsonData[settings[category].object]));
  for (const comp in data) {
    data[comp].id = comp;
  }
  res.json(data);
};
