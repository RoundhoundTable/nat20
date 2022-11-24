import { createUserWithEmailAndPassword } from "firebase/auth";
import { ApolloContext } from "../../../../interfaces/apollo";
import { IRegisterMutationInput } from "../../../../interfaces/graphql";
import { auth } from "../../../../libs/firebaseAdmin";
import app from "../../../../libs/firebaseApp";

const RegisterMutationHandler = async (
  _parent: unknown,
  { credentials }: IRegisterMutationInput,
  ctx: ApolloContext
) => {
  try {
    const firebaseCredentials = await createUserWithEmailAndPassword(
      app.auth,
      credentials.email,
      credentials.password
    );

    await ctx.prisma.user.create({
      data: {
        id: firebaseCredentials.user.uid,
        username: credentials.username,
      },
    });

    const token = await auth.createCustomToken(firebaseCredentials.user.uid);

    return token;
  } catch (err) {
    console.error(err);
  }
};

export default RegisterMutationHandler;
