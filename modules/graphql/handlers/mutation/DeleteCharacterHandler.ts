import { GraphQLError } from "graphql";
import { ApolloContext } from "../../../../interfaces/apollo";
import { formatServerError } from "../../../../utils/formatServerError";

const DeleteCharacterHandler = async (
  _parent: unknown,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  try {
    if (!ctx.user) throw new Error("Forbidden");

    const character = await ctx.prisma.character.findFirst({
      where: {
        id,
        userId: ctx.user.id,
      },
    });

    if (!character) throw new Error("Character not found");

    const deleted = await ctx.prisma.character.delete({
      where: {
        id,
      },
    });

    return Boolean(deleted);
  } catch (err) {
    throw new GraphQLError(JSON.stringify(formatServerError(err as Error)));
  }
};

export default DeleteCharacterHandler;
