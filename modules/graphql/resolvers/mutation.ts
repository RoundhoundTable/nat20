import {
  ILoginMutationInput,
  IRegisterMutationInput,
} from "../../../interfaces/graphql";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../libs/firebaseAdmin";
import { auth as clientAuth } from "../../../libs/firebaseApp";
import User from "../../firebase/entities/User";
import { ApolloContext } from "../../../interfaces/apollo";

const mutationResolver = {
  register: async (
    _parent: unknown,
    { credentials }: IRegisterMutationInput,
    ctx: ApolloContext
  ) => {
    try {
      const firebaseCredentials = await createUserWithEmailAndPassword(
        clientAuth,
        credentials.email,
        credentials.password
      );

      await User.create({
        uid: firebaseCredentials.user.uid,
        username: credentials.username,
      });

      const token = await auth.createCustomToken(firebaseCredentials.user.uid);

      return token;
    } catch (err) {
      console.error(err);
    }
  },
  login: async (
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
  },
};

export default mutationResolver;