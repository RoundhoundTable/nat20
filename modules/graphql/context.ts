import { ApolloContext } from "../../interfaces/apollo";
import { IUser } from "../../interfaces/firebase";
import { auth } from "../../libs/firebaseAdmin";
import User from "../firebase/entities/User";

export const createContext = async ({
  req,
  _,
}: {
  req: any;
  _: any;
}): Promise<ApolloContext> => {
  const regex = /Bearer (.+)/i;
  let user: IUser | null = null;

  if (req.headers.authorization) {
    const { authorization, ...headers } = req.headers;
    const idToken = authorization.match(regex)?.[1];

    if (idToken) {
      const token = await auth.verifyIdToken(idToken);

      user = await User.get(token.uid);
    }
  }

  return {
    user,
  };
};
