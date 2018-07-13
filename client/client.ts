import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache
} from "apollo-boost";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { cable } from "./cable";

const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "include"
});

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  );
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({
    cable
  }),
  httpLink
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
