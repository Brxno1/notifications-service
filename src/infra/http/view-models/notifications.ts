import { Notification } from '@app/entities/notification';

export interface NotificationViewModelProps {
  id: string;
  recipientId: string;
  content: string;
  category: string;
}

export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationViewModelProps {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }
}
