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
interface ServerRequestResponse {
  props: {
    graphqlData: unknown | null;
    error?: string | unknown;
  };
}

export const serverRequest = async ({ query, variables }: RequestParams): Promise<ServerRequestResponse> => {
  const client = new GraphQLClient(NEXT_PUBLIC_API, {
    headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` },
  });

  try {
    const data = await client.request(query, variables);
    return { props: { graphqlData: data } };
  } catch (error) {
    const graphqlError = error as ClientError;
    return { props: { graphqlData: null, error: graphqlError.message } };
  }
}

