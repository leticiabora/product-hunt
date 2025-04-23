"use client";

import { Response, ServerResponse } from "@/types/posts";
import Container from "../../Container/Container";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after, order: VOTES) {
      edges {
        node {
          id
          name
          description
        }
        cursor
      }
    }
  }
`;

const TYPES = [
  { order: "NEWEST", name: "Newest" },
  { order: "VOTES", name: "Popular" },
];

const Homepage = ({ posts }: ServerResponse) => {
  const [postsList, setPostList] = useState<Response>(posts);
  const [tab, setTab] = useState();

  // const { loading, error, data } = useQuery(GET_POSTS, { variables: { first: 10 } });

  useEffect(() => {
    setPostList(posts);
  }, []);

  // if (loading) return <div>Loading...</div>;

  // if (error) return <p>Error</p>;

  // console.log('client data', data);
  console.log("server data", posts);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        {TYPES.map((type) => (
          <div key={type.name}>
            <p>{type.name}</p>
              {postsList.edges.map((post) => (
              <p key={post.node.id}>{post.node.name}</p>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Homepage;
