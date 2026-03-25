import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dataRoutes from './routes/data.js';
import ordersRoutes from './routes/orders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// 1. Базовые middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Логгер
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3. API маршруты
app.use('/api/data', dataRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/test', (req, res) => {
  res.json({ message: 'API работает!', timestamp: new Date() });
});

// 4. Статические файлы
app.use(express.static(join(__dirname, '..')));

// 5. Фронтенд маршруты
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../index.html'));
});

// 6. Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
