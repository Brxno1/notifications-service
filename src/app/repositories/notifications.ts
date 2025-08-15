import { Notification } from '../entities/notification';

export interface FindManyByRecipientIdProps {
  recipientId: string;
  page?: number;
  limit?: number;
}

export abstract class NotificationsRepository {
  abstract findManyByRecipientId({
    recipientId,
    page,
    limit,
  }: FindManyByRecipientIdProps): Promise<Notification[]>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
}
