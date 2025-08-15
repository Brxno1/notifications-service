import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { NotificationNotFound } from './errors/notification-not-found';

@Injectable()
export class UnreadNotification {
  constructor(private repository: NotificationsRepository) {}

  async execute(notificationId: string): Promise<void> {
    const notification = await this.repository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.repository.save(notification);
  }
}
