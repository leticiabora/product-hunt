import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Homepage from '../src/components/pages/Homepage/Homepage';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { apiRequest } from '@/services/api';

jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    ApolloClient: jest.fn().mockImplementation(() => ({
      query: jest.fn().mockResolvedValue({ data: {} }),
    })),
    InMemoryCache: jest.fn(() => ({})),
    HttpLink: jest.fn(() => ({})),
    gql: actualApolloClient.gql,
  };
});

jest.mock('@/services/api', () => ({
  apiRequest: jest.fn(),
}));

(apiRequest as jest.Mock).mockImplementation(() =>
  Promise.resolve({
    data: {
      posts: [{ id: '1', name: 'Post 1', tagline: 'Tagline 1' }],
    },
  })
);

beforeAll(() => {
  class MockIntersectionObserver {
    root: Element | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];

    constructor(public callback: IntersectionObserverCallback) {}

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  global.IntersectionObserver = MockIntersectionObserver;
});


let params = new URLSearchParams('type=VOTES');

const mockUseSearchParams = jest.fn(() => params);

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
  usePathname: jest.fn(() => '/'),
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
        order: 'VOTES',
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
        order: 'NEWEST',
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
                id: '953323',
                name: 'Feelix',
                tagline: 'Create a Netflix-style site with personal video greetings',
                slug: 'feelix',
              },
              cursor: 'MQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957207',
                name: 'profilecode',
                tagline: 'AI generated personality insights & compatibility analysis',
                slug: 'profilecode',
              },
              cursor: 'Mg',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '935193',
                name: 'IOTA',
                tagline: 'ERP and CRM Development in Uzbekistan',
                slug: 'iota-4',
              },
              cursor: 'Mw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '945698',
                name: 'Clustr AI',
                tagline: "Leverage your company's network with AI to make more sales",
                slug: 'clustr-ai',
              },
              cursor: 'NA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957037',
                name: 'ChatExcel',
                tagline: 'Chat With Your Excel Data - AI for Excel',
                slug: 'chatexcel',
              },
              cursor: 'NQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957080',
                name: 'Zipplead',
                tagline: 'Lead generation software',
                slug: 'zipplead',
              },
              cursor: 'Ng',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '956949',
                name: 'Diuwin History Game',
                tagline: 'Diuwin History Game – Where Your Choices Rewrite History',
                slug: 'diuwin-history-game-2',
              },
              cursor: 'Nw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957033',
                name: 'Cuiz AI',
                tagline: 'Generate interactive quizzes from any content using AI',
                slug: 'cuiz-ai',
              },
              cursor: 'OA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '906610',
                name: 'FastCut AI',
                tagline: 'Cursor for Video Editing',
                slug: 'fastcut-ai',
              },
              cursor: 'OQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '956926',
                name: 'Aryson Window Live Mail to PST Converter',
                tagline: 'Convert Windows Live Mail to PST with all email items.',
                slug: 'aryson-window-live-mail-to-pst-converter',
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

const emptyMock = [
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

const errorMock = [
  {
    request: mocks[0].request,
    error: new Error('Network error'),
  },
];

describe('Homepage elements', () => {
  beforeEach(() => {
    mockUseSearchParams.mockReset();
    params = new URLSearchParams('type=VOTES');
  });
  it('Render loading text', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Renders error message on query failure', async () => {
    render(
      <MockedProvider mocks={errorMock}>
        <Homepage />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('Render first and last item from the first request', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    await waitFor(() => {
      const firstProduct = screen.getByText('Startup Stash');
      const lastProduct = screen.getByText('Hunter');

      expect(firstProduct).toBeInTheDocument();
      expect(lastProduct).toBeInTheDocument();
    });
  });

  it('Render two buttons with Popular and Newest labels', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    await waitFor(() => {
      const popularBtn = screen.getByRole('tab', { name: /popular/i });
      const newestBtn = screen.getByRole('tab', { name: /newest/i });

      expect(popularBtn).toBeInTheDocument();
      expect(newestBtn).toBeInTheDocument();
    });
  });

  it('Render a message if there is no post', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('type=VOTES'));
    render(
      <MockedProvider mocks={emptyMock}>
        <Homepage />
      </MockedProvider>,
    );

    await waitFor(() => {
      const message = screen.getByText(/no posts/i);

      expect(message).toBeInTheDocument();
    });
  });

  it('Render Popular as active on first render', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('type=VOTES'));
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    await waitFor(() => {
      const popularBtn = screen.getByRole('tab', { name: /popular/i });
      const newestBtn = screen.getByRole('tab', { name: /newest/i });

      expect(popularBtn).toHaveAttribute('aria-selected', 'true');
      expect(newestBtn).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('Check if the active button updates when change tab', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    const popularBtn = screen.getByRole('tab', { name: /popular/i });
    const newestBtn = screen.getByRole('tab', { name: /newest/i });

    expect(popularBtn).toHaveAttribute('aria-selected', 'true');
    expect(newestBtn).toHaveAttribute('aria-selected', 'false');

    const typeParams = params.get('type');

    expect(typeParams).toBe('VOTES');

    fireEvent.click(newestBtn);

    await waitFor(() => {
      expect(newestBtn).toHaveAttribute('aria-selected', 'true');
      expect(popularBtn).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Feelix')).toBeInTheDocument();
    });
  });
  it('Render items from "NEWEST" when tab is changed', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Homepage />
      </MockedProvider>,
    );

    const newestBtn = screen.getByRole('tab', { name: /newest/i });

    fireEvent.click(newestBtn);

    await waitFor(() => {
      const firstPost = screen.getByText('Feelix');
      const secondPost = screen.getByText('Aryson Window Live Mail to PST Converter');

      expect(firstPost).toBeInTheDocument();
      expect(secondPost).toBeInTheDocument();
    });
  });
});
