import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsRepository } from 'src/app/repositories/notifications';
import { Notification } from 'src/app/entities/notification';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
