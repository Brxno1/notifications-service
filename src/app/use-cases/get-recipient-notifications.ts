import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    if (notifications.length === 0) {
      return {
        notifications: [],
      };
    }

    return { notifications };
  }
}
