import { Content } from '@/app/entities/content';
import { Notification, NotificationProps } from '@/app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(overrides: Override = {}): Notification {
  const notification = new Notification({
    recipientId: overrides.recipientId ?? 'example-recipient-id',
    content: new Content('Content for notification testing'),
    category: overrides.category ?? 'social',
    ...overrides,
  });

  return notification;
}
