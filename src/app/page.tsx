import Homepage from '@/components/pages/Homepage/Homepage';
import { serverRequest } from '@/services/api';
import { gql } from 'graphql-request';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
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

export default async function Home() {
  const { posts } = await serverRequest({ query: GET_POSTS, variables: { first: 10 } })

  if (!posts) {
    return <p>Ops!! Something went wrong!</p>
  }

  return (
    <Homepage posts={posts} />
  );
}
