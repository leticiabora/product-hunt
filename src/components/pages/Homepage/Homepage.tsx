'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Response } from '@/types/posts';
import Skeleton from '@/components/Skeleton/Skeleton';

import * as S from './Homepage.styles';
import { Card } from '@/components/Card/Card.styles';

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
  { id: 'pop', order: 'VOTES', name: 'Popular' },
  { id: 'new', order: 'NEWEST', name: 'Newest' },
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

  const params = useSearchParams();
  const query = params.get('type');

  useEffect(() => {
    const tab = query ?? TYPES[0].order;
    setActiveTab(tab);
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
    <>
      <S.Wrapper>
        {TYPES.map((tab, index) => (
          <S.TabButton
            key={tab.id}
            $active={tab.order === activeTab}
            $position={index === 0 ? 'left' : 'right'}
            onClick={() => onTabChange(tab.order)}
          >
            {tab.name}
          </S.TabButton>
        ))}
      </S.Wrapper>
      <Container>
        <S.TabContent>
          {postsList?.edges?.length ? (
            postsList.edges.map((post, index) => (
              <Card
                key={post.node.id}
                ref={index === postsList.edges.length - 1 ? lastItemRef : null}
              >
                {post.node.name}
              </Card>
            ))
          ) : (
            <p>No Posts</p>
          )}
          {loadingMore &&
            Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} height={25} />)}
        </S.TabContent>
      </Container>
    </>
  );
};

export default Homepage;
