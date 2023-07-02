import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications/notifications.controller';
import { NotificationsService } from './services/notifications/notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: "ORDERS_SERVICES",
      useClass: NotificationsService,
    }
  ],
})
export class NotificationModule {}
