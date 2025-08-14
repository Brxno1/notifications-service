import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../create-notification-body';
import { PrismaService } from './prisma.service';
import { Notification } from '@prisma/client';

@Controller('/notifications')
export class AppController {
  constructor(private readonly db: PrismaService) {}

  @Get()
  async getNotifications(): Promise<Notification[] | string> {
    const notifications = await this.db.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (notifications.length === 0) {
      return 'No notifications found';
    }

    return notifications;
  }

  @Post()
  async createNotification(
    @Body() body: CreateNotificationBody,
  ): Promise<{ id: string; recipientId: string }> {
    const { content, category, recipientId } = body;

    const notification = await this.db.notification.create({
      data: {
        content,
        category,
        recipientId,
      },
    });

    return { id: notification.id, recipientId };
  }
}
