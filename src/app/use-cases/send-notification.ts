import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";

type SendNotificationRequest = {
  recipientId: string;
  content: string;
  category: string;
};

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(request: SendNotificationRequest) {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
