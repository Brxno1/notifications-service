import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { Notification } from 'src/app/entities/notification';

@Controller('/notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async createNotification(
    @Body() body: CreateNotificationBody,
  ): Promise<{ notification: Notification }> {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification,
    };
  }
}
