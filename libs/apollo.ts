import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "../modules/graphql/schema";

const apollo: ApolloServer = new ApolloServer({
  typeDefs,
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
