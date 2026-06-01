import express from 'express';
import { ErrorRequestHandler } from 'express';
import cors from 'cors';
import dataRoutes from './routes/data.js';
import ordersRoutes from './routes/orders.js';

const app = express();
const PORT = 3000;

// 1. Базовые middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost',  // Изменено с 3000 на 80
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

// 4. Обработка ошибок
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: 'error on server' });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});