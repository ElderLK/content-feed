import { describe, expect, test, vi } from "vitest";

import { GET } from "@/app/api/feed/route";
import { NextRequest } from "next/server";
import { httpStatus } from "@/utils/http";
import { feedItem, feedItems } from "../mocks";
import { env } from "@/utils/env";

const toJson = () =>
  Promise.resolve({ json: () => Promise.resolve([]) } as any);

global.fetch = vi.fn(toJson);
const fetch = vi.mocked(global.fetch);

describe("Feed API", () => {
  test("Should return 400 if searchParams are incorrect", async () => {
    const nextReq = new NextRequest(
      `http://localhost/api/feed?page=-1&perPage=-1`
    );

    const response = await GET(nextReq);
    expect(response.status).toBe(httpStatus.badRequest);

    const body = await response.json();
    expect(body).toEqual({
      errors: [{ name: "Invalid page number" }, { name: "Invalid page size" }],
    });
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  test("Should return 200 with one result", async () => {
    const nextReq = new NextRequest(
      `http://localhost/api/feed?page=1&perPage=1`
    );

    const responseApiFeed = new Response(
      JSON.stringify({ contentCards: [feedItem] }),
      {
        status: 200,
      }
    );
    fetch.mockResolvedValueOnce(responseApiFeed);

    const response = await GET(nextReq);
    expect(response.status).toBe(httpStatus.ok);

    expect(fetch).toHaveBeenCalledTimes(1);

    // expect(fetch).toHaveBeenCalledWith(env.feedURL);

    const body = await response.json();
    expect(body).toEqual([feedItem]);
  });

  test("Should return 200 and order the return values by priority desc", async () => {
    const nextReq = new NextRequest(`http://localhost/api/feed?page=1`);

    const responseApiFeed = new Response(
      JSON.stringify({ contentCards: feedItems }),
      {
        status: 200,
      }
    );
    fetch.mockResolvedValueOnce(responseApiFeed);
    const response = await GET(nextReq);
    expect(response.status).toBe(httpStatus.ok);

    const body = await response.json();
    expect(body.length).toBe(3);
    expect(body[0]).toEqual(feedItems[1]);
    expect(body[1]).toEqual(feedItems[2]);
    expect(body[2]).toEqual(feedItems[0]);
  });

  test("Should return 200 and return the first 2", async () => {
    const perPage = 2;
    const nextReq = new NextRequest(
      `http://localhost/api/feed?page=1&perPage=${perPage}`
    );

    const responseApiFeed = new Response(
      JSON.stringify({ contentCards: feedItems }),
      {
        status: 200,
      }
    );
    fetch.mockResolvedValueOnce(responseApiFeed);

    const response = await GET(nextReq);
    expect(response.status).toBe(httpStatus.ok);

    const body = await response.json();
    expect(body.length).toBe(perPage);
    expect(body[0]).toEqual(feedItems[1]);
    expect(body[1]).toEqual(feedItems[2]);
  });
});
