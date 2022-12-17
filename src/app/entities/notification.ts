import { randomUUID } from "node:crypto";

import type { Replace } from "@ignite-lab-nest/utils/Replace";

import { Content } from "./content";

export type NotificationProps = {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
};

export class Notification {
  private readonly _id: string;
  private readonly props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content() {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category() {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
}
