export enum AppealStatus {
    NEW = 'Новое',
    IN_PROGRESS = 'В работе',
    COMPLETED = 'Завершено',
    CANCELLED = 'Отменено'
  }
  
  export interface Appeal {
    _id?: string;
    topic: string;
    text: string;
    status: AppealStatus;
    resolution?: string;
    cancelReason?: string;
    createdAt: Date;
    updatedAt: Date;
  }