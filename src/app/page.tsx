import { FeedItem } from "@/entity";
import { headers } from "next/headers";
import { FeedCard } from "@/components/feed-card";
import { Feeds } from "@/components/feeds";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

type GetFeedParams = {
  page: string;
  perPage: string;
};

type GetFeedResult = {
  feeds: FeedItem[];
  apiUrl: string;
};

const getFeeds = async ({
  page,
  perPage,
}: GetFeedParams): Promise<GetFeedResult> => {
  const headersList = headers();
  const hostname =
    headersList.get("x-forwarded-host") || headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";

  const apiUrl = `${protocol}${hostname}`;

  const res = await fetch(
    `${apiUrl}/api/feed/?page=${page}&perPage=${perPage}`
  );

  return {
    feeds: await res.json(),
    apiUrl,
  };
};

export default async function Home({ searchParams }: Props) {
  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["perPage"] ?? "5";

  const { feeds, apiUrl } = await getFeeds({ page, perPage });

  return (
    <main className="flex min-h-screen flex-col items-center space-y-2">
      {feeds.map((item) => (
        <FeedCard key={item.id} {...item} />
      ))}
      <Feeds apiUrl={apiUrl} currentPage={parseInt(page)} />
    </main>
  );
}
