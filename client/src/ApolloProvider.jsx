import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { RouterProvider } from "react-router-dom";

import React from "react";
import App, { appRouter } from "./App";

const link = createHttpLink({
  link: "http://localhost:4000/graphql/"
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <RouterProvider router={appRouter} >
      <App />
    </RouterProvider>
  </ApolloProvider>
);
