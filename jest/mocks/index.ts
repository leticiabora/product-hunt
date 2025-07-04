import { GET_POSTS } from '@/services/queries/posts';
import { NEWEST } from './results/newest';
import { POPULAR_RESULT } from './results/popular';

const listSize = 10;

export const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: {
        first: listSize,
        order: 'VOTES',
      },
    },
    result: POPULAR_RESULT,
  },
  {
    request: {
      query: GET_POSTS,
      variables: {
        first: listSize,
        order: 'NEWEST',
      },
    },
    result: NEWEST,
  },
];

export const emptyMock = [
  {
    request: {
      query: GET_POSTS,
      variables: {
        first: 10,
        order: 'VOTES',
      },
    },
    result: {
      data: {
        posts: {
          __typename: 'PostConnection',
          edges: [],
          pageInfo: {
            __typename: 'PageInfo',
            hasNextPage: false,
            endCursor: null,
          },
        },
      },
    },
  },
];


export const errorMock = [
  {
    request: mocks[0].request,
    error: new Error('Network error'),
  },
];
