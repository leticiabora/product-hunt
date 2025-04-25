import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Params {
  id: number;
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

  const [post, setPost] = useState({});

  useEffect(() => {
    if (data?.post) {
      setPost(data.post);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;

  console.log('post', post);

  return (
    post && (
      <div
        style={{
          display: 'flex',
          padding: '2rem',
          flexDirection: 'column',
          gap: '2rem',
          backgroundColor: 'lightGray',
          overflow: 'auto',
          borderRadius: '2rem',
        }}
      >
        <Card noPadding>
          {post?.media?.[0] && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                borderRadius: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <Image
                src={post.media[0].url}
                alt={`top image for ${post?.name}`}
                objectFit="cover"
                objectPosition="center"
                fill
              />
            </div>
          )}
        </Card>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {post?.thumbnail && (
                <div
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '1.2rem',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={post?.thumbnail?.url}
                    alt={`thumbnail image for ${post?.name}`}
                    objectFit="contain"
                    fill
                  />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    padding: 0,
                    paddingTop: '1rem',
                    fontWeight: 500,
                    fontSize: '1.5rem',
                  }}
                >
                  {post.name}
                </h3>
                <p
                  style={{
                    backgroundColor: 'lightGray',
                    width: 'fit-content',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.7rem',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {post?.topics?.edges?.[0].node.name}
                </p>
              </div>
            </div>

            <div style={{ fontSize: '1.2rem', lineHeight: '1.8rem', color: 'gray' }}>
              {post.description}
              {post.description}
              {post.description}
              {post.description}
              {post.description}
              {post.description}
              {post.description}
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default PostDetails;
