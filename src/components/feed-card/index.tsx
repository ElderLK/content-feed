import React from "react";
import Image from "next/image";

import { FeedItem } from "@/entity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReadMore } from "../read-more";
import { Comments } from "../comments";

type Props = FeedItem;

export const FeedCard: React.FC<Props> = (feedItem) => {
  return (
    <Card className="max-w-xl w-full">
      <CardHeader className="h-80 relative m-2 rounded-md overflow-hidden">
        <Image
          src={feedItem.imageUri}
          alt="Feed image"
          priority
          fill
          className="relative"
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <CardTitle aria-label="Title">{feedItem.textData.title}</CardTitle>
            <CardDescription aria-label="SubTitle">
              {feedItem.textData.subTitle}
            </CardDescription>
          </div>
          <div>
            <span className="capitalize" aria-label="Author Last Name">
              {feedItem.textData.author.last}
            </span>
            .
            <span className="capitalize ml-1" aria-label="Author First Name">
              {feedItem.textData.author.first}
            </span>
          </div>
        </div>
        <ReadMore content={feedItem.textData.body} />
      </CardContent>
      <CardFooter className="mt-4">
        <Comments comments={feedItem.comments} />
      </CardFooter>
    </Card>
  );
};
