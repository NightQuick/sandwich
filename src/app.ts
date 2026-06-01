import express from 'express';
import { ErrorRequestHandler } from 'express';
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
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
  res.json({ message: 'API works', timestamp: new Date() });
});

const staticDir = process.env.NODE_ENV === 'production' ? join(__dirname, '../dist') : join(__dirname, '..');

// 4. Статические файлы
app.use(express.static(staticDir));

// 5. Фронтенд маршруты
app.get('/', (req, res) => {
  res.sendFile(join(staticDir, 'index.html'));
});

// 6. Обработка ошибок
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: 'error on server' });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
