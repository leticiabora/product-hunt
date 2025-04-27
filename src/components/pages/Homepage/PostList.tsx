import StatusScreen from '../StatusScreen/StatusScreen';
import { Loading } from './Loading/Loading';
import * as S from './Homepage.styles';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ArrowIcon } from '@/assets/icons';
import { RefObject } from 'react';
import { Response, ServerResponse } from '@/types/posts';
import { ApolloError } from '@apollo/client';

interface Params {
  loading: boolean;
  error: ApolloError | undefined;
  postsList: Response;
  lastItemRef: RefObject<HTMLDivElement | null>;
  onClick: (id: string) => void;
  loadingMore: boolean;
  data: ServerResponse;
}

const PostList: React.FC<Params> = ({ loading, error, postsList, lastItemRef, onClick, loadingMore, data }) => {

  if (error) return <StatusScreen />;
  if (loading || !data) return <Loading />;
  if (!data?.posts?.edges?.length) return <StatusScreen message="No posts yet." />;

  return (
    <S.ContainerList>
      <S.TabContent>
        {postsList.edges.map((post, index) => (
          <S.CardContainer
            key={post.node.id}
            ref={index === postsList.edges.length - 1 ? lastItemRef : null}
            onClick={() => onClick(post.node.id)}
          >
            <S.CardWrapper>
              {post?.node?.thumbnail?.url ? (
                <Thumbnail
                  src={post?.node?.thumbnail?.url}
                  alt={`thumbnail image for ${post?.node?.name}`}
                  width={60}
                  height={60}
                />
              ) : (
                <S.ImagePlaceholder $width={80} $height={80} />
              )}
              <S.CardContent>
                <S.Title>{post.node.name}</S.Title>
                <S.Item>{post.node.tagline}</S.Item>
              </S.CardContent>
              <S.Votes $isVoted={index === 6}>
                <ArrowIcon width={25} height={25} color={index === 6 ? 'white' : '#000'} />
                {post.node.votesCount}
              </S.Votes>
            </S.CardWrapper>
          </S.CardContainer>
        ))}
        {loadingMore && <Loading />}
      </S.TabContent>
    </S.ContainerList>
  );
};

export default PostList;
