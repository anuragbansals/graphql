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

mongoose.connect(MONGODB).then(async () => {
  console.log("Mongo connected!!");
  const { url } = await startStandaloneServer(server);
  console.log("Server ready at" + url);
});
