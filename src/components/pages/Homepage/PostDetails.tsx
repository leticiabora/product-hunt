import Card from '@/components/Card/Card';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as S from './PostDetails.styles';
import { Post } from '@/types/posts';
import Button from '@/components/Button/Button';

interface Params {
  id: string;
}

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      name
      tagline
      slug
      description
      thumbnail {
        url
      }
      media {
        url
      }
      topics {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

const PostDetails = ({ id }: Params) => {
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (data?.post) {
      setPost(data.post);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;

  if(!post) {
    return <p>No post!</p>;
  }

  return (
    <S.Container>
      <S.Wrapper>
        <Card noPadding>
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
        <Card>
          <S.ContentWrapper>
            <S.HeaderContainer>
              {post?.thumbnail && (
                <S.Thumbnail>
                  <Image
                    src={post?.thumbnail?.url}
                    alt={`thumbnail image for ${post?.name}`}
                    objectFit="cover"
                    fill
                  />
                </S.Thumbnail>
              )}
              <S.TitleWrapper>
                <S.Title>{post.name}</S.Title>
                <S.Badge>{post?.topics?.edges?.[0].node.name}</S.Badge>
              </S.TitleWrapper>
            </S.HeaderContainer>
            <S.Description>{post.description}</S.Description>
          </S.ContentWrapper>
        </Card>
      </S.Wrapper>
        <S.BottomCardWrapper>
          <S.BottomCard>
            <Button onClick={() => console.log('click')}>Get It</Button>
            <Button variant="secondary" onClick={() => console.log('click')}>
              Upvote (512)
            </Button>
          </S.BottomCard>
        </S.BottomCardWrapper>
    </S.Container>
  );
};

export default PostDetails;
