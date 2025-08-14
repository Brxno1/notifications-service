import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { Notification } from '../entities/notification';

interface GetNotificationRequest {
  recipientId: string;
}

interface GetNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: GetNotificationRequest): Promise<GetNotificationResponse> {
    const notifications =
      await this.notificationsRepository.findByRecipientId(recipientId);

    if (!notifications) {
      return {
        notifications: [],
      };
    }

    return {
      notifications,
    };
  }
}
