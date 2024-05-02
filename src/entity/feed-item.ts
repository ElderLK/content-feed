export type FeedItem = {
  id: string;
  imageUri: string;
  textData: {
    title: string;
    subTitle: string;
    body: string;
    author: {
      first: string;
      last: string;
    };
  };
  metadata: {
    priority: number;
    publishDate: string;
  };
  comments: {
    text: string;
    author: string;
    profilePic: string;
    likes: number;
  }[];
};
