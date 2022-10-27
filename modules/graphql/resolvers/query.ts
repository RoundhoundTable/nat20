import { ApolloContext } from "../../../interfaces/apollo";

const queryResolver = {
  _user: (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    return ctx.user;
  },
  campaigns: async (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    if (!ctx.user) return;

    const campaigns = await ctx.prisma.campaign.findMany({
      where: {
        dungeonMasterId: ctx.user.id,
      },
    });

    return campaigns;
  },
};

export default queryResolver;
