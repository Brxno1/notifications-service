import { Body, Controller, Patch, Post, Param, Get } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/app/use-cases/send-notification';
import { CancelNotification } from '@/app/use-cases/cancel-notifications';
import {
  NotificationViewModel,
  NotificationViewModelProps,
} from '../view-models/notifications';
import { GetRecipientNotifications } from '@/app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@/app/use-cases/count-recipient-notifications';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private GetRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) { }

  @Get('/:recipientId/list')
  async handleGetRecipientNotifications(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationViewModelProps[] }> {
    const { notifications } = await this.GetRecipientNotifications.execute({
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
    await this.cancelNotification.execute(id);
  }

  @Get('/:recipientId/count')
  async handleCountNotifications(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countRecipientNotifications.execute(recipientId);

    return { count };
  }
}
