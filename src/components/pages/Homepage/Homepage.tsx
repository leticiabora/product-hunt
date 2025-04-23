'use client';

import { Response, ServerResponse } from '@/types/posts';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

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

// const Homepage = ({ posts }: ServerResponse) => {
  const Homepage = () => {
  const [postsList, setPostsList] = useState([]);
  const [fetchPosts, { loading, error, data, fetchMore }] = useLazyQuery(GET_POSTS);
  const [hasMore, setHasMore] = useState(true);

  const [activeTab, setActiveTab] = useState(TYPES[0].order);

  const lastItemRef = useRef(null);

  const { loadMore, loadingMore } = useInfiniteScroll(postsList, setPostsList, fetchMore, activeTab, loading, hasMore, setHasMore, lastItemRef);


  useEffect(() => {
    if (data?.posts) {
      setPostsList(data.posts);
    }
  }, [data])

  useEffect(() => {
    fetchPosts({ variables: { first: 10, order: activeTab } });
    console.log('changed!', activeTab);
  }, [activeTab]);

  const onTabChange = (order: string) => {
    setActiveTab(order);
    setHasMore(true);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  console.log('loadingMore', loadingMore)
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
      <button onClick={() => loadMore()}>Load More</button>
      <div>
        {postsList?.edges?.length ? postsList.edges.map((post, index) => (
          <p key={post.node.id} ref={index === postsList.edges.length - 1 ? lastItemRef : null}>
            {post.node.name}
          </p>
        )): <p>No Posts</p>}
        {loadingMore && <p>Loading...</p>}
        {/* {!hasMore && postsList.edges.length > 0 && <p>No more posts</p>} */}
      </div>
    </Container>
  );
};

export default Homepage;
