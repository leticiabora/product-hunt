import { ApolloClient, InMemoryCache, HttpLink, DocumentNode } from '@apollo/client';
import { ClientError } from 'graphql-request';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: '/api/',
  }),
  cache: new InMemoryCache(),
});

interface RequestParams {
  query: DocumentNode;
  variables?: Record<string, unknown>;
}
interface ServerRequestResponse<T> {
  data?: { [key: string]: T };
  error?: string | unknown;
}

export const apiRequest = async <T>({ query, variables }: RequestParams): Promise<ServerRequestResponse<T>> => {
  try {
    const data = await client.query<{ posts: T }>({ query, variables });

    return data;
  } catch (error) {
    const graphqlError = error as ClientError;
    return { error: graphqlError.message };
  }
}

