import mongoose, { Schema } from 'mongoose';
import { Appeal, AppealStatus } from '../types/appeal.types';

const appealSchema = new Schema({
  topic: { type: String, required: true },
  text: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(AppealStatus), 
    default: AppealStatus.NEW 
  },
  resolution: { type: String },
  cancelReason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const AppealModel = mongoose.model<Appeal>('Appeal', appealSchema);