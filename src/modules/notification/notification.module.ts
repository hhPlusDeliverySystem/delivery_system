import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications/notifications.controller';
import notificationsConsumer from './controllers/notifications/notificationCosumer';




@Module({
  controllers: [NotificationsController],
  providers: [notificationsConsumer],
})
export class NotificationModule {}
