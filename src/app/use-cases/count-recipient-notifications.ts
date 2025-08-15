import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications';

@Injectable()
export class CountRecipientNotifications {
  constructor(private repository: NotificationsRepository) {}

  async execute(recipientId: string): Promise<number> {
    const count = await this.repository.countByRecipientId(recipientId);

    return count;
  }
}
