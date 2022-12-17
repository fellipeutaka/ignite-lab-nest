import { Module } from "@nestjs/common";

import { CancelNotification } from "@ignite-lab-nest/app/use-cases/cancel-notification";
import { CountRecipientNotifications } from "@ignite-lab-nest/app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@ignite-lab-nest/app/use-cases/get-recipient-notifications";
import { ReadNotification } from "@ignite-lab-nest/app/use-cases/read-notification";
import { SendNotification } from "@ignite-lab-nest/app/use-cases/send-notification";
import { UnreadNotification } from "@ignite-lab-nest/app/use-cases/unread-notification";

import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
