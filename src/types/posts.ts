export type Post = {
  __typename: 'Post';
  id: string;
  name: string;
  tagline: string;
};

export type Edge = {
  cursor: string;
  node: Post;
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
