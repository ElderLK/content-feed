import { describe, expect, test } from "vitest";

import { env } from "@/utils/env";
import { httpStatus } from "@/utils/http";

describe("External Feed API", () => {
  test("Should return 400 if searchParams are incorrect", async () => {
    const headers = {
      Prefer: "code=200, dynamic=true",
    };

    const feedData = await fetch(env.feedURL, {
      headers: new Headers(headers),
    });
    expect(feedData.status).toBe(httpStatus.ok);

    const body = await feedData.json();

    expect(body.contentCards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          imageUri: expect.any(String),
          textData: expect.any(Object),
          comments: expect.any(Array),
        }),
      ])
    );
  });
});
