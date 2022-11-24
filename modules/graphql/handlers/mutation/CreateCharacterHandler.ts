import { Character, Prisma } from "@prisma/client";
import { ApolloContext } from "../../../../interfaces/apollo";
import uploadImage from "../../../firebase/uploadImage";
import { uuidv4 } from "@firebase/util";

const CreateCharacterHandler = async (
  _parent: unknown,
  { payload }: { payload: Omit<Character, "userId"> },
  ctx: ApolloContext
) => {
  try {
    if (!ctx.user) throw new Error("Forbidden");

    const { stats, picture, ...characterData } = payload;

    let downloadUrl = undefined;

    if (picture)
      downloadUrl = (await uploadImage(picture, uuidv4())).downloadUrl;

    const character = await ctx.prisma.character.create({
      data: {
        ...characterData,
        stats: JSON.parse(stats as string) as Prisma.JsonObject,
        picture: downloadUrl ?? undefined,
        userId: ctx.user.id,
      },
    });

    return Boolean(character);
  } catch (err) {
    console.error(err);
  }
};

export default CreateCharacterHandler;
