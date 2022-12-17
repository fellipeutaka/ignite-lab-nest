import { Injectable } from "@nestjs/common";

import { NotificationsRepository } from "../repositories/notifications-repository";

type CountRecipientNotificationsRequest = {
  recipientId: string;
};

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(request: CountRecipientNotificationsRequest) {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId
    );

    return {
      count,
    };
  }
}
