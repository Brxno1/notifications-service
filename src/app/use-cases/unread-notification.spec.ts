import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { UnreadNotification } from './unread-notification';
import { makeNotification } from '@test/factories/notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(repository);

    const notification = makeNotification({
      recipientId: 'example-recipient-id',
      readAt: new Date(),
    });

    await repository.create(notification);

    await unreadNotification.execute(notification.id);

    expect(repository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(repository);

    await expect(
      unreadNotification.execute('non-existing-notification-id'),
    ).rejects.toThrow(NotificationNotFound);
  });
});
