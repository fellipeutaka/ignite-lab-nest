import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import * as request from "supertest";

import { uuidRegex } from "@ignite-lab-nest/utils/regex";

import { AppModule } from "./../src/app.module";

describe("NotificationsController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const recipientId = randomUUID();

  it("/notifications (POST)", async () => {
    return await request(app.getHttpServer())
      .post("/notifications")
      .send({
        content: "John Doe wants to be your friend!",
        category: "social",
        recipientId,
      })
      .expect(201);
  });

  it(`/notifications/count/from/${recipientId} (GET)`, async () => {
    return await request(app.getHttpServer())
      .get(`/notifications/count/from/${recipientId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({ count: 1 }));
      });
  });

  it(`/notifications/from/${recipientId} (GET)`, async () => {
    return await request(app.getHttpServer())
      .get(`/notifications/from/${recipientId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            notifications: [
              {
                id: expect.stringMatching(uuidRegex),
                content: "John Doe wants to be your friend!",
                category: "social",
                recipientId,
              },
            ],
          })
        );
      });
  });
});
