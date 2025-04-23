'use client';

import { Response, ServerResponse } from '@/types/posts';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String, $order: PostsOrder) {
    posts(first: $first, after: $after, order: $order) {
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
  { id: 'new', order: 'NEWEST', name: 'Newest' },
  { id: 'pop', order: 'VOTES', name: 'Popular' },
];

const Homepage = ({ posts }: ServerResponse) => {
  const [postsList, setPostsList] = useState<Response>(posts);
  const [fetchPosts, { loading, error, data }] = useLazyQuery(GET_POSTS);
  const [activeTab, setActiveTab] = useState(TYPES[0].order);

  // const { loading, error, data } = useQuery(GET_POSTS, { variables: { first: 10 } });

  useEffect(() => {
    console.log('data', data);
    if (data?.posts) {
      setPostsList(data.posts);
    }
  }, [data]);

  // if (loading) return <div>Loading...</div>;

  // if (error) return <p>Error</p>;

  // console.log('client data', data);

  useEffect(() => {
    fetchPosts({ variables: { first: 20, order: activeTab }});
    console.log('changed!', activeTab);
  }, [activeTab]);

  const onTabChange = (order) => {
    setActiveTab(order);
  };

  if (loading) return <p>Loading...</p>;

  console.log('DATA:', postsList);

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        {TYPES.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.order}
            aria-controls={`panel-${tab.id}`}
            className={`tab-button ${activeTab === tab.order ? 'active' : ''}`}
            onClick={() => onTabChange(tab.order)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div>
        {postsList.edges.map((post) => (
          <p key={post.node.id}>{post.node.name}</p>
        ))}
      </div>
    </Container>
  );
};

export default Homepage;
