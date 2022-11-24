import { ApolloContext } from "../../../../interfaces/apollo";

const CharactersQueryHandler = async (
  _parent: unknown,
  _: unknown,
  ctx: ApolloContext
) => {
  try {
    const characters = await ctx.prisma.character.findMany({
      where: {
        userId: ctx.user?.id,
      },
    });

    return characters;
  } catch (err) {
    console.error(err);
  }
};

export default CharactersQueryHandler;
