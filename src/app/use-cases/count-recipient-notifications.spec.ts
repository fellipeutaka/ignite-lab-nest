import { makeNotification } from "@ignite-lab-nest/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@ignite-lab-nest/test/in-memory-repositories/notifications-repository";

import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count recipient notifications", () => {
  it("should be able to recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      })
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      })
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recipient-2",
      })
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toBe(2);
  });
});
