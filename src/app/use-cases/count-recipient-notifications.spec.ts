import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();

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

    const countRecipientNotifications = new CountRecipientNotifications(
      repository,
    );

    const count = await countRecipientNotifications.execute(
      'example-recipient-id-1',
    );

    expect(count).toBe(1);
  });
});
