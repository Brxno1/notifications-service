import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '@test/factories/notification';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(repository);

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id',
      }),
    );

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id',
      }),
    );

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications[0]).toEqual(
      expect.objectContaining({
        recipientId: 'example-recipient-id',
      }),
    );
  });
});
