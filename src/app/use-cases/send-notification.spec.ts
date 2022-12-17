import { InMemoryNotificationsRepository } from "@ignite-lab-nest/in-memory-repositories/notifications-repository";
import { SendNotification } from "./send-notification";
import { randomUUID } from "node:crypto";

describe("Send notification", () => {
  it("should be able to send a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: "social",
      content: "This is a notification",
      recipientId: randomUUID(),
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
