import { signInWithEmailAndPassword } from "firebase/auth";
import { ApolloContext } from "../../../../interfaces/apollo";
import { ILoginMutationInput } from "../../../../interfaces/graphql";
import { auth } from "../../../../libs/firebaseAdmin";
import app from "../../../../libs/firebaseApp";

const LoginMutationHandler = async (
  _parent: unknown,
  { credentials }: ILoginMutationInput,
  _: ApolloContext
) => {
  try {
    const firebaseCredentials = await signInWithEmailAndPassword(
      app.auth,
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
