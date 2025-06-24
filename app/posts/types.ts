export interface Post {
  _id: number;
  username: string;
  // avatar: string;
  timestamp: string;
  topic: string;
  content: string;
  community: string;
  commentCount: number;
  __v: number;
  comments?: Comment[];
}

export interface Comment {
  _id: number;
  username: string;
  content: string;
  timestamp: string;
}

