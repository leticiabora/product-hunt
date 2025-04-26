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
  }),
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
                votesCount
                thumbnail {
                  url
                  type
                }
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
                votesCount: 9265,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/4bb79a58-baab-4434-af76-985ca67ed467.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 7804,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/0938b95e-183a-4a09-8c81-741e5ebe6861.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 7289,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/a1a7887b-04ad-4d69-b395-f2d58443f836.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 5609,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/e9f88f98-ede9-42af-9386-09f96eb55f2b.gif?auto=format',
                  type: 'image',
                },
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
                votesCount: 4638,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/0b3a0d78-0517-4ce8-b985-77e7e4e85801.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 4471,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/d545b370-91c4-434f-b816-e0585dafbf98.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 4438,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/fe5c5a34-f8f2-4f54-950d-7c0156d225b9.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 4117,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/fc08f03f-53c1-407c-b8b0-34710db53b45.png?auto=format',
                  type: 'image',
                },
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
                votesCount: 3912,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/d381ef8b-c839-4dfb-a078-61c7893b8ade.gif?auto=format',
                  type: 'image',
                },
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
                votesCount: 3847,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/78a04b3f-028a-4d02-a341-62beca8168c5.jpeg?auto=format',
                  type: 'image',
                },
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
                votesCount
                thumbnail {
                  url
                  type
                }
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
                id: '957897',
                name: 'Hyperion',
                tagline: 'A clean, powerful Django starter kit for SaaS builders',
                slug: 'hyperion-2',
                votesCount: 7,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/9e3d3953-a6ad-4f90-8e60-a6f2f943886b.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'MQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957896',
                name: 'UniTakerPro',
                tagline: 'UniTaskerPro –SaaS Solution for Smarter Business Management.',
                slug: 'unitakerpro',
                votesCount: 6,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/9d8002b9-955c-46ba-a07e-63fd5b579eb3.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'Mg',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957915',
                name: 'Brother Cell Phone List',
                tagline: 'Phone number list',
                slug: 'brother-cell-phone-list',
                votesCount: 5,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/7b8bb880-e754-4e00-b62c-95ce8fb471af.jpeg?auto=format',
                  type: 'image',
                },
              },
              cursor: 'Mw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957721',
                name: 'LexiOps',
                tagline: 'LexiOps is an AI-powered infrastructure management platform.',
                slug: 'lexiops',
                votesCount: 4,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/55dfd39a-4215-4547-aa86-f337c3f144f8.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'NA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957192',
                name: 'More Fans App',
                tagline: 'Social media to connect with friends, family, and creators.',
                slug: 'more-fans-app',
                votesCount: 6,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/b71608a4-f5c3-49d0-8d2f-0758566a6f4f.jpeg?auto=format',
                  type: 'image',
                },
              },
              cursor: 'NQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957572',
                name: 'ResumAI',
                tagline: 'Make a resume in seconds powered by AI',
                slug: 'resumai',
                votesCount: 6,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/55c046df-2373-4f98-8854-0d624997bb48.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'Ng',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '955623',
                name: 'CodeCity',
                tagline: 'Show off your GitHub, Beautifully.',
                slug: 'codecity',
                votesCount: 24,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/33091c2b-d5a6-4fe6-9ec8-16859dafa1f5.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'Nw',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957767',
                name: 'friend-l.ink',
                tagline: 'local friendmaking',
                slug: 'friend-l-ink',
                votesCount: 6,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/3b3886bb-c77e-4b6f-84bf-900c63eb3716.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'OA',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '957759',
                name: 'logcal.app',
                tagline: 'a social diary',
                slug: 'logcal-app',
                votesCount: 7,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/02f024a5-3d29-486e-9e9e-35b9202fd2af.png?auto=format',
                  type: 'image',
                },
              },
              cursor: 'OQ',
            },
            {
              __typename: 'PostEdge',
              node: {
                __typename: 'Post',
                id: '946621',
                name: 'AI Chatbot',
                tagline: 'A classroom AI chatbot is a smart tool made for schools. ',
                slug: 'ai-chatbot-9',
                votesCount: 6,
                thumbnail: {
                  __typename: 'Media',
                  url: 'https://ph-files.imgix.net/286d651a-9806-4130-9957-68dbb7483e38.vnd.microsoft.icon?auto=format',
                  type: 'image',
                },
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
                votesCount
                thumbnail {
                  url
                  type
                }
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
      </MockedProvider>,
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
      expect(screen.getByText('Hyperion')).toBeInTheDocument();
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
      const firstPost = screen.getByText('Hyperion');
      const secondPost = screen.getByText('AI Chatbot');

      expect(firstPost).toBeInTheDocument();
      expect(secondPost).toBeInTheDocument();
    });
  });
});
