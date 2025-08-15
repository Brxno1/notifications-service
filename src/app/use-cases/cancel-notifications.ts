import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { NotificationNotFound } from './errors/notification-not-found';

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(notificationId: string): Promise<void> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
