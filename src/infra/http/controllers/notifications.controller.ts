import { Body, Controller, Patch, Post, Param, Get } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/app/use-cases/send-notification';
import { CancelNotification } from '@/app/use-cases/cancel-notifications';
import {
  NotificationViewModel,
  NotificationViewModelProps,
} from '../view-models/notifications';
import { GetNotification } from '@/app/use-cases/get-notification';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private getNotification: GetNotification,
  ) {}

  @Get('/:recipientId/list')
  async handleGetNotifications(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationViewModelProps[] }> {
    const { notifications } = await this.getNotification.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Post()
  async handleSendNotification(
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

  @Patch(':id/cancel')
  async handleCancelNotification(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }
}
