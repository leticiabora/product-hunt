export type PostDetailId = {
  data: {
    post: {
      id: string;
    }
  }
  id: string;
};


export type Edge = {
  cursor: string;
  node: Post;
};


export type Post = {
  __typename: 'Post';
  id: string;
  name: string;
  tagline: string;
  slug: string;
  description: string;
  media: Array<{ url: string }>;
  thumbnail?: { url: string, type: string };
  topics: { edges: Edge[] };
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
} | undefined;

export type ServerResponse = {
  posts: {
    edges: Edge[];
    pageInfo?: PageInfo;
  };
};

export type Response = {
  edges: Edge[];
  pageInfo?: PageInfo;
};
