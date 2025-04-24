import { Response, ServerResponse } from '@/types/posts';
import { ApolloQueryResult } from '@apollo/client';
import { ClientError } from 'graphql-request';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface Variables {
  first: number;
  after: string | undefined;
  order: string;
}

const useInfiniteScroll = (
  data: Response,
  setData: React.Dispatch<React.SetStateAction<Response>>,
  fetchMore: (options: {
    updateQuery: (
      prev: ServerResponse,
      { fetchMoreResult }: { fetchMoreResult: ServerResponse },
    ) => ServerResponse;
    variables: Variables;
  }) => Promise<ApolloQueryResult<ServerResponse>>,
  order: string,
  loading: boolean,
  hasMore: boolean,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  lastItemRef: RefObject<HTMLElement | null>,
) => {
  const lastCursor = data?.edges?.at(-1)?.cursor;
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<ClientError | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    try {
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const uniqueIds = new Set(prev.posts.edges.map((edge) => edge.node.id));

          const filterEdges = fetchMoreResult.posts.edges.filter(
            (edge) => !uniqueIds.has(edge.node.id),
          );

          const edges = [...(prev?.posts?.edges ?? []), ...filterEdges];

          const updatedPosts = {
            ...fetchMoreResult.posts,
            edges,
            pageInfo: fetchMoreResult.posts.pageInfo,
          };

          const checkHasMore = fetchMoreResult?.posts?.pageInfo?.hasNextPage ?? false;

          setData(updatedPosts);
          setHasMore(checkHasMore);

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
      const newError = error as ClientError;
      setError(newError);
      setData({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      });
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
    error,
  };
};

export default useInfiniteScroll;
