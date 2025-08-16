import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/app/use-cases/send-notification';
import { CancelNotification } from '@/app/use-cases/cancel-notifications';
import {
  NotificationViewModel,
  NotificationViewModelProps,
} from '../view-models/notifications';
import { GetRecipientNotifications } from '@/app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@/app/use-cases/count-recipient-notifications';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';

@Controller('/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly GetRecipientNotifications: GetRecipientNotifications,
    private readonly countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Get('/:recipientId/list')
  async getByRecipient(
    @Param('recipientId') recipientId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ notifications: NotificationViewModelProps[] }> {
    const parsedPage = page ? Math.max(1, Number(page)) : 1;
    const parsedLimit = limit ? Math.max(1, Math.min(100, Number(limit))) : 15;

    const { notifications } = await this.GetRecipientNotifications.execute({
      recipientId,
      page: isNaN(parsedPage) ? 1 : parsedPage,
      limit: isNaN(parsedLimit) ? 15 : parsedLimit,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Post()
  async create(
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

  @Put(':id/cancel')
  async cancelById(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute(id);
  }

  @Get('/:recipientId/count')
  async countByRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countRecipientNotifications.execute(recipientId);

    return { count };
  }
}
