import { Request, Response } from 'express';
import { AppealModel } from '../models/appeal.model';
import { AppealStatus } from '../types/appeal.types';

export class AppealController {
  async createAppeal(req: Request, res: Response) {
    try {
      const { topic, text } = req.body;
      if (!topic || !text) {
        return res.status(400).json({ error: 'Тема и текст обязательны' });
      }

      const appeal = new AppealModel({
        topic,
        text,
        status: AppealStatus.NEW
      });

      await appeal.save();
      res.status(201).json(appeal);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании обращения' });
    }
  }

  async takeAppeal(req: Request, res: Response) {
    try {
      const appeal = await AppealModel.findOneAndUpdate(
        { _id: req.params.id, status: AppealStatus.NEW },
        { 
          status: AppealStatus.IN_PROGRESS,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!appeal) {
        return res.status(404).json({ error: 'Обращение не найдено или уже в работе' });
      }

      res.json(appeal);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обработке' });
    }
  }

  async completeAppeal(req: Request, res: Response) {
    try {
      const { resolution } = req.body;
      if (!resolution) {
        return res.status(400).json({ error: 'Необходимо указать решение' });
      }

      const appeal = await AppealModel.findOneAndUpdate(
        { _id: req.params.id, status: AppealStatus.IN_PROGRESS },
        { 
          status: AppealStatus.COMPLETED,
          resolution,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!appeal) {
        return res.status(404).json({ error: 'Обращение не найдено или не в работе' });
      }

      res.json(appeal);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при завершении' });
    }
  }

  async cancelAppeal(req: Request, res: Response) {
    try {
      const { cancelReason } = req.body;
      if (!cancelReason) {
        return res.status(400).json({ error: 'Необходимо указать причину отмены' });
      }

      const appeal = await AppealModel.findByIdAndUpdate(
        req.params.id,
        { 
          status: AppealStatus.CANCELLED,
          cancelReason,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!appeal) {
        return res.status(404).json({ error: 'Обращение не найдено' });
      }

      res.json(appeal);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при отмене' });
    }
  }

  async getAppeals(req: Request, res: Response) {
    try {
      const { date, startDate, endDate } = req.query;
      const query: any = {};

      if (date) {
        const targetDate = new Date(date as string);
        query.createdAt = {
          $gte: targetDate.setHours(0,0,0,0),
          $lte: targetDate.setHours(23,59,59,999)
        };
      } else if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        };
      }

      const appeals = await AppealModel.find(query).sort({ createdAt: -1 });
      res.json(appeals);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении списка' });
    }
  }

  async cancelAllInProgress(req: Request, res: Response) {
    try {
      const result = await AppealModel.updateMany(
        { status: AppealStatus.IN_PROGRESS },
        { 
          status: AppealStatus.CANCELLED,
          cancelReason: 'Массовая отмена',
          updatedAt: new Date()
        }
      );

      res.json({ 
        message: 'Успешно отменено',
        modifiedCount: result.modifiedCount 
      });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при массовой отмене' });
    }
  }
}