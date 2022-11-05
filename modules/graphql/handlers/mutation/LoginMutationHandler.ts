import { signInWithEmailAndPassword } from "firebase/auth";
import { ApolloContext } from "../../../../interfaces/apollo";
import { ILoginMutationInput } from "../../../../interfaces/graphql";
import { auth } from "../../../../libs/firebaseAdmin";
import { auth as clientAuth } from "../../../../libs/firebaseApp";

const LoginMutationHandler = async (
  _parent: unknown,
  { credentials }: ILoginMutationInput,
  ctx: ApolloContext
) => {
  try {
    const firebaseCredentials = await signInWithEmailAndPassword(
      clientAuth,
      credentials.email,
      credentials.password
    );

    const token = await auth.createCustomToken(firebaseCredentials.user.uid);

    return token;
  } catch (err) {
    console.error(err);
  }
};

export default LoginMutationHandler;
