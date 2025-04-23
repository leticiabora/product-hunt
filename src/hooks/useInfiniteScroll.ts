const useInfiniteScroll = (data, setData, fetchMore, order) => {
  const lastCursor = data?.edges?.at(-1)?.cursor;

  const loadMore = () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const edges = [
          ...(prev?.posts?.edges ?? []),
          ...(fetchMoreResult?.posts?.edges ?? []),
        ];

        const updatedPosts = {
          ...fetchMoreResult.posts,
          edges,
        };

        setData(updatedPosts);

        return {
          posts: updatedPosts,
        };
      },
      variables: {
        first: 10,
        after: lastCursor,
        order: order,
      },
    });
  };

  return {
    loadMore,
  };
};


export default useInfiniteScroll;