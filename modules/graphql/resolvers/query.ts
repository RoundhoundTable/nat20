import { ApolloContext } from "../../../interfaces/apollo";
import Campaign from "../../firebase/entities/Campaign";
import User from "../../firebase/entities/User";

const queryResolver = {
  _user: (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    return ctx.user;
  },
  campaigns: async (_parent: unknown, _: unknown, ctx: ApolloContext) => {
    if (!ctx.user) return;

    const userRef = await User.getRef(ctx.user.uid);
    const campaigns = await Campaign.getByUser(userRef);
    const parsedCampaigns = await Promise.all(
      campaigns.map(async (campaign) => Campaign.parse(campaign!))
    );

    return parsedCampaigns;
  },
};

export default queryResolver;
