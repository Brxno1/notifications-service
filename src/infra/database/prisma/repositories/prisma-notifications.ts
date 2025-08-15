import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsRepository } from '@/app/repositories/notifications';
import { Notification } from '@/app/entities/notification';
import { PrismaNotificationMapper } from '../mapppers/prisma-notification';
@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.upsert({
      where: { id: notification.id },
      update: raw,
      create: raw,
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }
}
