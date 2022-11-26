import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "../modules/graphql/schema";
import Mutation from "../modules/graphql/resolvers/mutation";
import Query from "../modules/graphql/resolvers/query";
import { createContext } from "../modules/graphql/context";
import { GraphQLError } from "graphql";
import { randomUUID } from "crypto";

const apollo: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: createContext,
  formatError(error: GraphQLError) {
    if (error.originalError instanceof GraphQLError) return error;

    const errorId = randomUUID();
    console.error({
      error: {
        id: errorId,
        name: error.name,
        message: error.message,
        path: error.path,
        stack: error.stack,
      },
    });

    return new GraphQLError(`Internal Error: ${errorId}`);
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "request.credentials": "include",
      },
    }),
  ],
});

export const startServer = apollo.start();

export default apollo;
