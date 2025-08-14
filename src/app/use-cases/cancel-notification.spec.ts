import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CancelNotification } from './cancel-notifications';
import { Notification } from '../entities/notification';
import { Content } from '../entities/content';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('This is a notification'),
      category: 'social',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
});
