import { ApolloContext } from "../../../interfaces/apollo";
import CharactersQueryHandler from "../handlers/query/CharactersQueryHandler";

const queryResolver = {
  _user: (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    return ctx.user;
  },
  characters: CharactersQueryHandler,
};

export default queryResolver;
