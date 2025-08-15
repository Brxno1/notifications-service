import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
  page: number;
  limit: number;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private repository: NotificationsRepository) {}

  async execute({
    recipientId,
    page,
    limit,
  }: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const notifications = await this.repository.findManyByRecipientId({
      recipientId,
      page,
      limit,
    });

    if (notifications.length === 0) {
      return {
        notifications: [],
      };
    }

    return { notifications };
  }
}
