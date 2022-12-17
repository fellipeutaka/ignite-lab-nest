import { makeNotification } from "@ignite-lab-nest/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@ignite-lab-nest/test/in-memory-repositories/notifications-repository";

import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("Read notification", () => {
  it("should be able to read a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeInstanceOf(
      Date
    );
  });

  it("should NOT be able to read a non existing notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    void expect(async () => {
      return await readNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
