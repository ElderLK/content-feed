"use client";

import React from "react";

import { FeedItem } from "@/entity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Format } from "@/lib/format";

type Props = {
  comments: FeedItem["comments"];
};

export const Comments: React.FC<Props> = ({ comments }) => {
  const [showAll, setShowAll] = React.useState(false);

  const toggleShowAll = () => {
    if (comments.length) setShowAll(true);
  };

  return (
    <div className="mt-4 w-full">
      {showAll ? (
        <div className="leading-normal max-h-40 overflow-y-auto">
          {comments.map((c, idx) => (
            <div
              key={idx}
              className="flex"
              aria-label={`Comment number ${idx + 1}`}
            >
              <Avatar>
                <AvatarImage src={c.profilePic} />
                <AvatarFallback>{c.author.substring(1, 3)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <div>
                  <a href="#" className="mr-1 font-bold">
                    {c.author}
                  </a>
                  <span className="text-sm">{c.text}</span>
                </div>
                {c.likes && (
                  <span className="text-xs text-slate-400">
                    {Format.CompactNumber(c.likes)} likes
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : comments.length ? (
        <button
          className="bg-white text-slate-400 px-2 py-1"
          onClick={toggleShowAll}
          aria-label={`View all ${comments.length} comments`}
        >
          View all {comments.length} comments
        </button>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
};
