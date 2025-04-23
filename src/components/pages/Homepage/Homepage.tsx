'use client';

import Container from "../../Container/Container";
import { useQuery, gql } from '@apollo/client';

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

const Homepage = () => {
  const { loading, error, data } = useQuery(GET_POSTS, { variables: { first: 10 } });

if (loading) return <div>Loading...</div>;

if (error) return <p>Error</p>

console.log('Test error', error);
console.log('Test data', data);

  return (
    <Container>
      <p>Hello world!</p>
    </Container>
  )
}

export default Homepage;