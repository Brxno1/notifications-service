import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '@test/factories/notification';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(repository);

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id-1',
      }),
    );

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id-1',
      }),
    );

    await repository.create(
      makeNotification({
        recipientId: 'example-recipient-id-2',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-id-1',
      page: 1,
      limit: 10,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'example-recipient-id-1',
        }),
        expect.objectContaining({
          recipientId: 'example-recipient-id-1',
        }),
      ]),
    );
  });
});
