import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(repository);

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'This is a notification',
      category: 'social',
    });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0]).toEqual(notification);
  });
});
