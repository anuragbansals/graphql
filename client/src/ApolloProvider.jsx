import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import React from "react";
import App from "./App";

const client = new ApolloClient({
  link: "http://localhost:5000",
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
