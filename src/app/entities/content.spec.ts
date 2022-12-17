import { Content } from "./content";

describe("Notification Content", () => {
  it("should be able to create a notification content", () => {
    const content = new Content("New friend request!");

    expect(content).toBeTruthy();
  });

  it("should NOT be able to create a notification content with less than 5 characters", () => {
    expect(() => new Content("test")).toThrowError("Content length error");
  });

  it("should NOT be able to create a notification content with more than 240 characters", () => {
    expect(() => new Content("test".repeat(241))).toThrowError(
      "Content length error"
    );
  });
});
