type Post = {
  __typename: 'Post';
  id: string;
  name: string;
  description: string;
};

export type Edge = {
  cursor: string;
  node: Post;
};

export type Response = {
  posts: {
    edges?: Edge[];
  };
};
