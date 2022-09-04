import { ApolloContext } from "../../../interfaces/apollo";

const queryResolver = {
  _user: (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    return ctx.user;
  },
};

export default queryResolver;
