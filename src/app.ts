import express, { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { AppealController } from './controllers/appeal.controller';
import { dbConfig } from './config/db.config';

const app = express();
const appealController = new AppealController();

app.use(express.json());

// Подключение к БД
mongoose.connect(dbConfig.uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Обертка для асинхронных обработчиков с гибким возвращаемым типом
const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

// Роуты
app.post('/appeals', asyncHandler(appealController.createAppeal.bind(appealController)));
app.patch('/appeals/:id/take', asyncHandler(appealController.takeAppeal.bind(appealController)));
app.patch('/appeals/:id/complete', asyncHandler(appealController.completeAppeal.bind(appealController)));
app.patch('/appeals/:id/cancel', asyncHandler(appealController.cancelAppeal.bind(appealController)));
app.get('/appeals', asyncHandler(appealController.getAppeals.bind(appealController)));
app.post('/appeals/cancel-all-in-progress', asyncHandler(appealController.cancelAllInProgress.bind(appealController)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});