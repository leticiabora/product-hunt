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

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      name
      tagline
      slug
      description
      votesCount
      thumbnail {
        url
        type
      }
      media {
        url
      }
      topics {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
