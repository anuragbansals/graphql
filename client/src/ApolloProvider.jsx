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


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <RouterProvider router={appRouter} >
      <App />
    </RouterProvider>
  </ApolloProvider>
);
