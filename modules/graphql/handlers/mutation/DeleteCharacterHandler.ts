import { ApolloContext } from "../../../../interfaces/apollo";

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
    console.error(err);
  }
};

export default DeleteCharacterHandler;
