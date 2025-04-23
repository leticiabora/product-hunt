import { NEXT_PUBLIC_API } from '@/config/envs';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GraphQLClient, ClientError } from 'graphql-request';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: '/api/',
  }),
  cache: new InMemoryCache(),
});

interface RequestParams {
  query: string;
  variables?: Record<string, unknown>;
}
interface ServerRequestResponse<T> {
  posts?: T | null;
  error?: string | unknown;
}

export const serverRequest = async <T>({ query, variables }: RequestParams): Promise<ServerRequestResponse<T>> => {
  const client = new GraphQLClient(NEXT_PUBLIC_API, {
    headers: { Authorization: `Beearer ${process.env.DEV_TOKEN}` },
  });

  try {
    const data = await client.request<{ posts: T }>(query, variables);
    return data;
  } catch (error) {
    const graphqlError = error as ClientError;
    return { error: graphqlError.message };
  }
}

