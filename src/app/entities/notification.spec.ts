import { Content } from './contents';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('This is a notification'),
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
