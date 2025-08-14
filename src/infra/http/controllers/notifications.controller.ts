import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/app/use-cases/send-notification';
import {
  NotificationViewModel,
  NotificationViewModelProps,
} from '../view-models/notifications';

@Controller('/notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async createNotification(
    @Body() body: CreateNotificationBody,
  ): Promise<{ notification: NotificationViewModelProps }> {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
