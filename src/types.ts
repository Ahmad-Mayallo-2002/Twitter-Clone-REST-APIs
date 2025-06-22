export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  location: string;
  avatar: string;
  cover: string;
};

export type Tweet = {
  id: number;
  content?: string;
  media?: string[];
  authorId: number;
};

export type Reply = {
  id: number;
  content?: string;
  media?: string[];
  userId: number;
  tweetId: number;
};
