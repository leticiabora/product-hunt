'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Response } from '@/types/posts';

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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const TYPES = [
  { id: 'new', order: 'NEWEST', name: 'Newest' },
  { id: 'pop', order: 'VOTES', name: 'Popular' },
];

const Homepage = () => {
  const [postsList, setPostsList] = useState<Response>({
    edges: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
  });
  const [fetchPosts, { loading, error, data, fetchMore }] = useLazyQuery(GET_POSTS);
  const [hasMore, setHasMore] = useState(true);

  const [activeTab, setActiveTab] = useState(TYPES[0].order);

  const lastItemRef = useRef(null);

  const { loadingMore } = useInfiniteScroll(
    postsList,
    setPostsList,
    fetchMore,
    activeTab,
    loading,
    hasMore,
    setHasMore,
    lastItemRef,
  );

  useEffect(() => {
    if (data?.posts) {
      setPostsList(data.posts);
    }
  }, [data]);

  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('type');

  useEffect(() => {
    const tab = query ?? TYPES[0].order;
    setActiveTab(tab)
  }, []);

  useEffect(() => {
    fetchPosts({ variables: { first: 10, order: activeTab } });
  }, [activeTab]);

  const onTabChange = (order: string) => {
    setActiveTab(order);
    setHasMore(true);

    window.history.pushState({}, '', `/?type=${order}`);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

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
        {postsList?.edges?.length ? (
          postsList.edges.map((post, index) => (
            <p key={post.node.id} ref={index === postsList.edges.length - 1 ? lastItemRef : null}>
              {post.node.name}
            </p>
          ))
        ) : (
          <p>No Posts</p>
        )}
        {loadingMore && <p>Loading...</p>}
      </div>
    </Container>
  );
};

export default Homepage;
