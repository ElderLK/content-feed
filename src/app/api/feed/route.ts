import { NextRequest, NextResponse } from "next/server";

import { env } from "@/utils/env";
import { FeedItem } from "@/entity";
import { httpStatus } from "@/utils/http";

interface FeedData {
  contentCards: FeedItem[];
}

export async function GET(req: NextRequest): Promise<NextResponse<FeedItem[]>> {
  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") ?? "1");
  const perPage = parseInt(url.searchParams.get("perPage") ?? "100");

  const validationErrors: { name: string }[] = [];
  if (isNaN(page) || page <= 0) {
    validationErrors.push({ name: "Invalid page number" });
  }
  if (isNaN(perPage) || perPage <= 0) {
    validationErrors.push({ name: "Invalid page size" });
  }

  if (validationErrors.length) {
    return new NextResponse(JSON.stringify(validationErrors), {
      status: httpStatus.badRequest,
    });
  }

  const headers = {
    // "Accept": "application/json",
    Prefer: "code=200, dynamic=true",
  };

  const feedData = await fetch(env.feedURL, { headers: new Headers(headers) });
  const result: FeedData = await feedData.json();

  result.contentCards.sort((a, b) => b.metadata.priority - a.metadata.priority);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedContent = result.contentCards.slice(startIndex, endIndex);

  return new NextResponse(JSON.stringify(paginatedContent), {
    status: httpStatus.ok,
  });
}
