import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "../modules/graphql/schema";
import Mutation from "../modules/graphql/resolvers/mutation";
import Query from "../modules/graphql/resolvers/query";
import { createContext } from "../modules/graphql/context";

const apollo: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: createContext,
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
