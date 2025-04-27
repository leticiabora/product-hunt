import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Homepage from '../../src/components/pages/Homepage/Homepage';
import { MockedProvider } from '@apollo/client/testing';
import { apiRequest } from '@/services/api';
import { emptyMock, errorMock, mocks } from '../mocks';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/theme/theme';

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
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe('Homepage elements', () => {
  beforeEach(() => {
    mockUseSearchParams.mockReset();
    params = new URLSearchParams('type=VOTES');
  });
  // it('Render loading text', async () => {
  //   render(
  //     <MockedProvider mocks={mocks}>
  //       <ThemeProvider theme={theme}>
  //       <Homepage />
  //       </ThemeProvider>
  //     </MockedProvider>,
  //   );

  //   expect(screen.getByText(/loading/i)).toBeInTheDocument();
  // });

  it('Renders error message on query failure', async () => {
    render(
      <MockedProvider mocks={errorMock}>
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Ops! Something went wrong./i)).toBeInTheDocument();
    });
  });

  it('Render first and last item from the first request', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
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
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
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
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
    );

    await waitFor(() => {
      const message = screen.getByText(/No posts yet./i);

      expect(message).toBeInTheDocument();
    });
  });

  it('Render Popular as active on first render', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('type=VOTES'));
    render(
      <MockedProvider mocks={mocks}>
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
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
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
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
        <ThemeProvider theme={theme}>
        <Homepage />
        </ThemeProvider>
        </MockedProvider>
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
