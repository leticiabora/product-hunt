import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String, $order: PostsOrder) {
    posts(first: $first, after: $after, order: $order) {
      edges {
        node {
          id
          name
          tagline
          slug
          votesCount
          thumbnail {
            url
            type
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_ID = gql`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      id
    }
  }
`;
