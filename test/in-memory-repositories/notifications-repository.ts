import { Notification } from "src/app/entities/notification";
import { NotificationsRepository } from "src/app/repositories/notifications-repository";

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string) {
    return (
      this.notifications.find((item) => item.id === notificationId) ?? null
    );
  }

  async findManyByRecipientId(recipientId: string) {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId
    );
  }

  async countManyByRecipientId(recipientId: string) {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
