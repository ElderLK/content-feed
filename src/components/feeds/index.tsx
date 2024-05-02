"use client";

import { useState, useEffect, useCallback } from "react";

import { FeedItem } from "@/entity";
import { Spinner } from "@/components/spinner";
import { FeedCard } from "@/components/feed-card";

type Props = {
  apiUrl: string;
  currentPage: number;
};

export const Feeds: React.FC<Props> = ({ apiUrl, currentPage }) => {
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<FeedItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/api/feed/?page=${page + 1}&perPage=${5}`
        );
        const data = await response.json();
        setFeeds((prevFeeds) => {
          if (
            prevFeeds[prevFeeds.length - 1]?.id !== data[data.length - 1]?.id
          ) {
            return [...prevFeeds, ...data];
          }

          return prevFeeds;
        }); // Append new data to existing feeds
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when component mounts
    fetchData();

    // Clean up function
    return () => {
      // Perform cleanup if needed
    };
  }, [page, apiUrl]); // Fetch data when page state changes

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading]);

  // Add event listener to window for scroll detection
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {feeds.map((item) => (
        <FeedCard key={item.id} {...item} />
      ))}
      {!loading && (
        <div className="flex items-center justify-center p-14">
          <Spinner />
        </div>
      )}
    </div>
  );
};
