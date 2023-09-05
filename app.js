import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { PubSub } from "graphql-subscriptions";


import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";
import { MONGODB } from "./config.js";

// Create the schema so that can be used separately by apolloserver and websockkt server
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// const app = express();
// const httpServer = createServer();

// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: "/subscriptions",
// });

const pubSub = new PubSub();

// const serverCleanup = useServer(
//   {
//     schema,
//     context: async (ctx, msg, args) => {
//       return getDynamicContext(ctx, msg, args);
//     },
//   },
//   wsServer,
// );

// const server = new ApolloServer({
//   schema,
//   plugins: [
//     ApolloServerPluginDrainHttpServer({ httpServer }),
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           },
//         };
//       },
//     },
//   ],
  
// });

// const { url } = await startStandaloneServer(server, {
//     // from here we pass the headers to all the requests
//     context: async ({ req }) => ({ req }),
//   });

// await server.start().then((url)=> {
//   console.log(server,'zzz urr')
// });
// app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

// const PORT = 4001;

// httpServer.listen(PORT, () => {
//   console.log("Server is running at ->", PORT);
//   mongoose.connect(MONGODB).then(async () => {
//     console.log("Mongo connected!!");
//   });
// });

// console.log(server,'zzz serrr')



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB).then(async () => {
  console.log("Mongo connected!!");
  const { url } = await startStandaloneServer(server, {
    // from here we pass the headers to all the requests
    context: async ({ req }) => ({ req, pubSub }),
  });
});





