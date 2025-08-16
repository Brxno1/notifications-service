import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { AuthTestController } from './controllers/auth-test.controller';
import { HealthController } from './controllers/health.controller';
import { SendNotification } from '@/app/use-cases/send-notification';
import { CancelNotification } from '@/app/use-cases/cancel-notifications';
import { DatabaseModule } from '../database/database.module';
import { GetRecipientNotifications } from '@/app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@/app/use-cases/count-recipient-notifications';
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController, AuthTestController, HealthController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
