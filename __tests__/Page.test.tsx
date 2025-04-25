import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Homepage from '../src/components/pages/Homepage/Homepage';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('type=NEWEST'),
}));

const mocks = [
  {
    request: {
      query: gql`
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
      `,
      variables: {
        first: 10,
        order: 'NEWEST'
      },
    },
    result: {
      data: {
        posts: {
          __typename: 'PostConnection',
          edges: [
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '14717',
                name: 'Startup Stash',
                tagline: 'A curated directory of 400 resources & tools for startups',
                slug: 'startup-stash',
              },
              cursor: 'MQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '474117',
                name: 'Wordware',
                tagline: 'Your tool for building AI agents with natural language',
                slug: 'wordware',
              },
              cursor: 'Mg',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '76',
                name: 'Slack',
                tagline: 'Be less busy. Real-time messaging, archiving & search.',
                slug: 'slack',
              },
              cursor: 'Mw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '75048',
                name: 'Startup Pitch Decks',
                tagline: 'Real decks from real startups that raised over $400M',
                slug: 'startup-pitch-decks',
              },
              cursor: 'NA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '22121',
                name: 'Pexels 2.0',
                tagline: 'The best free stock photos in one place',
                slug: 'pexels-2-0',
              },
              cursor: 'NQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '141420',
                name: 'remove.bg',
                tagline: 'Remove the background of any image 100% automatically',
                slug: 'remove-bg',
              },
              cursor: 'Ng',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '122747',
                name: 'Notion 2.0',
                tagline: 'The all-in-one workspace - notes, tasks, wikis, & databases',
                slug: 'notion-2-0',
              },
              cursor: 'Nw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '57801',
                name: 'Good Email Copy',
                tagline: 'Email copy from great companies.',
                slug: 'good-email-copy',
              },
              cursor: 'OA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '9917',
                name: 'Coolors',
                tagline: 'Super fast color schemes generator for cool designers',
                slug: 'coolers',
              },
              cursor: 'OQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '19454',
                name: 'Hunter',
                tagline: 'Find all the email addresses related to a domain',
                slug: 'hunter',
              },
              cursor: 'MTA',
            },
          ],
          pageInfo: {
            __typename: 'PageInfo',
            hasNextPage: true,
            endCursor: 'MTA',
          },
        },
      },
    },
  },
];

describe('Page', () => {
  it('renders a heading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Homepage />
      </MockedProvider>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
