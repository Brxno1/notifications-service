import { Notification } from '@/app/entities/notification';
import {
  FindManyByRecipientIdProps,
  NotificationsRepository,
} from '@/app/repositories/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findManyByRecipientId({
    recipientId,
    page = 1,
    limit = 10,
  }: FindManyByRecipientIdProps): Promise<Notification[]> {
    const notifications = this.notifications
      .filter((notification) => notification.recipientId === recipientId)
      .slice((page - 1) * limit, (page - 1) * limit + limit);

    return notifications;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification ?? null;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }
}
