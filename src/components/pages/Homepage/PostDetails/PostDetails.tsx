import Card from '@/components/Card/Card';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as S from './PostDetails.styles';
import { Post } from '@/types/posts';
import Button from '@/components/Button/Button';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import Loading from './Loading/Loading';
import StatusScreen from '../../StatusScreen/StatusScreen';
import { GET_POST } from '@/services/queries/posts';
import { redirect } from 'next/dist/server/api-utils';

interface Params {
  id: string;
}

const PostDetails = ({ id }: Params) => {
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (data?.post) {
      setPost(data.post);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <StatusScreen />;

  if (!post) {
    return null;
  }
  
  return (
    <S.Container>
      <S.Wrapper>
        <Card>
          {post?.media?.[0] && (
            <S.ImageWrapper>
              <Image
                src={post.media[0].url}
                alt={`top image for ${post?.name}`}
                objectFit="contain"
                fill
              />
            </S.ImageWrapper>
          )}
        </Card>
        <S.CardDetails>
          <S.ContentWrapper>
            <S.HeaderContainer>
              {post?.thumbnail && (
                <Thumbnail
                  src={post?.thumbnail?.url}
                  alt={`thumbnail image for ${post?.name}`}
                  fill
                />
              )}
              <S.TitleWrapper>
                <S.Title>{post.name}</S.Title>
                <S.BadgeContainer>
                  <S.Badge>{post?.topics?.edges?.[0]?.node?.name}</S.Badge>
                </S.BadgeContainer>
              </S.TitleWrapper>
            </S.HeaderContainer>
            <S.Description>{post.description}</S.Description>
          </S.ContentWrapper>
        </S.CardDetails>
      </S.Wrapper>
      <S.BottomCardWrapper>
        <S.BottomCard>
          <Button onClick={() => console.log('click')}>Get It</Button>
          <Button variant="secondary" onClick={() => console.log('click')}>
            Upvote ({post.votesCount})
          </Button>
        </S.BottomCard>
      </S.BottomCardWrapper>
    </S.Container>
  );
};

export default PostDetails;
