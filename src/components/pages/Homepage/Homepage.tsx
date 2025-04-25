'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Response } from '@/types/posts';
import Skeleton from '@/components/Skeleton/Skeleton';

import * as S from './Homepage.styles';
import LinkContainer from '@/components/LinkContainer/LinkContainer';
import Modal from '@/components/Modal/Modal';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String, $order: PostsOrder) {
    posts(first: $first, after: $after, order: $order) {
      edges {
        node {
          id
          name
          tagline
          slug
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
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <>
    <h1>Product Hunt</h1>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ color: 'white', height: '20px' }}>
          test
          test
          test
          test
          test
          test
        </div>
      </Modal>
      <S.Wrapper>
        {TYPES.map((tab, index) => (
          <S.TabButton
          key={tab.id}
          role="tab"
          aria-selected={tab.order === activeTab}
          $active={tab.order === activeTab}
          $position={index === 0 ? 'left' : 'right'}
          onClick={() => onTabChange(tab.order)}
          >
            {tab.name}
          </S.TabButton>
        ))}
      </S.Wrapper>
        <button onClick={() => setOpenModal(true)}>Open Modal</button>
      <Container>
        <S.TabContent>
          
          {loading ? <p>Loading...</p> : error ? <p>Error!</p> : postsList?.edges?.length ? (
            postsList.edges.map((post, index) => (
              <LinkContainer key={post.node.id} href='/'>
                <S.Card
                  ref={index === postsList.edges.length - 1 ? lastItemRef : null}
                >
                  <S.Item>{post.node.name}</S.Item>
                  <S.Item>{post.node.slug}</S.Item>
                  <S.Item>{post.node.tagline}</S.Item>
                </S.Card>
              </LinkContainer>
            ))
          ) : (
            <S.Item>No Posts</S.Item>
          )}
          {loadingMore &&
            Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} height={25} />)}
        </S.TabContent>
      </Container>
    </>
  );
};

export default Homepage;
