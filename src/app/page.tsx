import Homepage from '@/components/pages/Homepage/Homepage';
import { serverRequest } from '@/services/api';
import { ServerResponse } from '@/types/posts';
import { gql } from 'graphql-request';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after, order: NEWEST) {
      edges {
        node {
          id
          name
          description
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

export default async function Home() {
  // const { posts } = await serverRequest<ServerResponse>({
  //   query: GET_POSTS,
  //   variables: { first: 10 },
  // });

  // if (!posts) {
  //   return <p>Ops!! Something went wrong!</p>;
  // }

  // return <Homepage posts={posts} />;
  return <Homepage />;
}
