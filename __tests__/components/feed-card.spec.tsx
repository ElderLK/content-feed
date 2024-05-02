import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeedCard } from "@/components/feed-card";

import { feedItem } from "../mocks";

describe("TEST", () => {
  test("Should render the component", async () => {
    render(<FeedCard {...feedItem} />);

    const image: HTMLImageElement = screen.getByAltText("Feed image");
    expect(image).toHaveAttribute("src", expect.any(String));
    expect(image.src).contains(encodeURIComponent(feedItem.imageUri));

    expect(screen.getByLabelText("Title").textContent).toBe(
      feedItem.textData.title
    );

    expect(screen.getByLabelText("SubTitle").textContent).toBe(
      feedItem.textData.subTitle
    );

    expect(screen.getByLabelText("Author Last Name").textContent).toBe(
      feedItem.textData.author.last
    );

    expect(screen.getByLabelText("Author First Name").textContent).toBe(
      feedItem.textData.author.first
    );

    expect(screen.getByLabelText("Content Description").textContent).toBe(
      feedItem.textData.body
    );

    expect(
      screen.getByLabelText(`View all ${feedItem.comments.length} comments`)
    ).toBeInTheDocument();
  });
});
