'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '../../Container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Response } from '@/types/posts';
import Skeleton from '@/components/Skeleton/Skeleton';

import * as S from './Homepage.styles';
import Modal from '@/components/Modal/Modal';
import PostDetails from './PostDetails';

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
  const [postId, setPostId] = useState(null);

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
  const query = params?.get('type') ?? TYPES[0].order;
  const queryUrl = '?type=';

  useEffect(() => {
    setActiveTab(query);
  }, []);

  useEffect(() => {
    fetchPosts({ variables: { first: 10, order: activeTab } });
  }, [activeTab]);

  const onTabChange = (order: string) => {
    setActiveTab(order);
    setHasMore(true);

    window.history.pushState({}, '', `/${queryUrl}${order}`);
  };

  const handleModal = (post) => {
    window.history.pushState({}, '', `/posts/${post.node.slug}${queryUrl}${query}`);
    setPostId(post.node.id);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setPostId(null);
    window.history.pushState({}, '', '/');
  };

  return (
    <>
      <h1>Product Hunt</h1>
      {postId && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <PostDetails id={postId} />
        </Modal>
      )}
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error!</p>
          ) : postsList?.edges?.length ? (
            postsList.edges.map((post, index) => (
              <S.Card
                key={post.node.id}
                ref={index === postsList.edges.length - 1 ? lastItemRef : null}
                onClick={() => handleModal(post)}
              >
                <S.Item>{post.node.name}</S.Item>
                <S.Item>{post.node.slug}</S.Item>
                <S.Item>{post.node.tagline}</S.Item>
              </S.Card>
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
