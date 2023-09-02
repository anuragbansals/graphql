import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";
import { MONGODB } from "./config.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log(server,'zzz serrr')

mongoose.connect(MONGODB).then(async () => {
  console.log("Mongo connected!!");
  const { url } = await startStandaloneServer(server, {
    // from here we pass the headers to all the requests
    context: async ({ req }) => ({ req }),
  });
});
