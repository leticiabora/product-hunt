import { NEXT_PUBLIC_API } from '@/config/envs';
import { ApolloClient, InMemoryCache, HttpLink, DocumentNode } from '@apollo/client';
import { GraphQLClient, ClientError } from 'graphql-request';

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
  posts?: T | null;
  error?: string | unknown;
}

export const apiRequest = async <T>({ query, variables }: RequestParams): Promise<ServerRequestResponse<T>> => {
  const clientS = new GraphQLClient(NEXT_PUBLIC_API, {
    headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` },
  });

  console.log(clientS)
  console.log(client)

  try {
    const data = await client.query<{ posts: T }>({ query, variables });

    return data;
  } catch (error) {
    const graphqlError = error as ClientError;
    return { error: graphqlError.message };
  }
}

