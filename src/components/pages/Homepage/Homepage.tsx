'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { PostDetailId, Response } from '@/types/posts';
import dayjs from 'dayjs';

import * as S from './Homepage.styles';
import Modal from '@/components/Modal/Modal';
import PostDetails from './PostDetails/PostDetails';
import { apiRequest } from '@/services/api';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { SearchIcon } from '@/assets/icons';
import PostList from './PostList';
import { GET_POST_ID, GET_POSTS } from '@/services/queries/posts';

const TYPES = [
  { id: 'pop', order: 'VOTES', name: 'Popular' },
  { id: 'new', order: 'NEWEST', name: 'Newest' },

];

const postListSize = 10; 

const Homepage = () => {
  const [postsList, setPostsList] = useState<Response>({
    edges: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
  });
  const [fetchPosts, { loading, error, data, fetchMore }] = useLazyQuery(GET_POSTS);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);

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

  const pathname = usePathname();

  const fetchPost = async (slug: string): Promise<string | null> => {
    try {
      const postDetail = await apiRequest<PostDetailId>({
        query: GET_POST_ID,
        variables: { slug },
      });

      if (postDetail?.data?.post?.id) {
        return postDetail.data.post.id;
      }

      return null;
    } catch {
      setPostId(null);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setActiveTab(query);

      if (pathname.startsWith('/posts/')) {
        const slug = pathname.split('/posts/')[1];
        const fetchPostId = await fetchPost(slug);
        setPostId(fetchPostId);

        return fetchPostId;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchPosts({ variables: { first: postListSize, order: activeTab } });
  }, [activeTab]);

  const onTabChange = (order: string) => {
    setActiveTab(order);
    setHasMore(true);

    window.history.pushState({}, '', `/${queryUrl}${order}`);
  };

  const handleModal = (id: string) => {
    window.history.pushState({}, '', `/posts/${id}${queryUrl}${query}`);
    setOpenModal(true);
  };

  useEffect(() => {
    if (!postId) {
      window.history.pushState({}, '', '/');
      return;
    }

    handleModal(postId);
  }, [postId]);

  const closeModal = () => {
    setOpenModal(false);
    setPostId(null);
    window.history.pushState({}, '', '/');
  };

  return (
    <>
      {postId && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <PostDetails id={postId} />
        </Modal>
      )}
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.Header>
            <S.ProfileWrapper>
              <Thumbnail
                src="/product-hunt-cat.png"
                alt="thumbnail image for profile"
                width={60}
                height={60}
              />
            </S.ProfileWrapper>
            <S.DateWrapper>{`Today, ${dayjs(new Date()).format('DD MMM')}`}</S.DateWrapper>
            <SearchIcon width={30} height={30} />
          </S.Header>
          <S.Wrapper>
            {TYPES.map((tab) => (
              <S.TabButton
                key={tab.id}
                role="tab"
                aria-selected={tab.order === activeTab}
                $active={tab.order === activeTab}
                onClick={() => onTabChange(tab.order)}
              >
                {tab.name}
              </S.TabButton>
            ))}
          </S.Wrapper>
        </S.HeaderContent>
      </S.HeaderContainer>
      <PostList
        loading={loading}
        error={error}
        postsList={postsList}
        lastItemRef={lastItemRef}
        onClick={(id) => setPostId(id)}
        loadingMore={loadingMore}
        data={data}
      />
    </>
  );
};

export default Homepage;
