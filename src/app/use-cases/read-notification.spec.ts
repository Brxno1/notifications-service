import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { ReadNotification } from './read-notification';
import { makeNotification } from '@test/factories/notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification({
      recipientId: 'example-recipient-id',
    });

    await repository.create(notification);

    await readNotification.execute(notification.id);

    expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(repository);

    await expect(
      readNotification.execute('non-existing-notification-id'),
    ).rejects.toThrow(NotificationNotFound);
  });
});
