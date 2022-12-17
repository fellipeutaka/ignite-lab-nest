import { Content } from "@ignite-lab-nest/app/entities/content";
import {
  Notification,
  NotificationProps,
} from "@ignite-lab-nest/app/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "social",
    content: new Content("New friend request!"),
    recipientId: "recipient-2",
    ...override,
  });
}
