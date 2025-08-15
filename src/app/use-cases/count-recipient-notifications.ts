import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications';

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(recipientId: string): Promise<number> {
    const count =
      await this.notificationsRepository.countByRecipientId(recipientId);

    return count;
  }
}
