import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CancelNotification } from './cancel-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const repository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(repository);

    const notification = makeNotification({
      recipientId: 'example-recipient-id',
    });

    await repository.create(notification);

    await cancelNotification.execute(notification.id);

    expect(repository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(repository);

    await expect(
      cancelNotification.execute('non-existing-notification-id'),
    ).rejects.toThrow(NotificationNotFound);
  });
});
