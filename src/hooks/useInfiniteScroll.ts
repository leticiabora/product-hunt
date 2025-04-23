import { useCallback, useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (
  data,
  setData,
  fetchMore,
  order,
  loading,
  hasMore,
  setHasMore,
  lastItemRef,
) => {
  const lastCursor = data?.edges?.at(-1)?.cursor;
  const [loadingMore, setLoadingMore] = useState(false);
  const timeoutRef = useRef(null);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    try {
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          console.log('fetchMoreResult', fetchMoreResult);

          const edges = [...(prev?.posts?.edges ?? []), ...(fetchMoreResult?.posts?.edges ?? [])];

          const updatedPosts = {
            ...fetchMoreResult.posts,
            edges,
            pageInfo: fetchMoreResult.posts.pageInfo,
          };

          setData(updatedPosts);
          setHasMore(fetchMoreResult.posts.pageInfo.hasNextPage);

          return {
            posts: updatedPosts,
          };
        },
        variables: {
          first: 10,
          after: lastCursor,
          order,
        },
      });
    } catch (error) {
      console.error('Error fetching more data:', error);
      setData({ posts: [] });
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [fetchMore, order, setData, lastCursor, setHasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !loadingMore && hasMore) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            loadMore();
          }, 500);
        }
      },
      { threshold: 0.1 },
    );

    if (lastItemRef.current) observer.observe(lastItemRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, loadingMore, hasMore, loadMore]);

  return {
    loadMore,
    loadingMore,
  };
};

export default useInfiniteScroll;
