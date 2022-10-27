import { User } from "@prisma/client";
import { ApolloContext } from "../../interfaces/apollo";
import { auth } from "../../libs/firebaseAdmin";
import prisma from "../../libs/prisma";

export const createContext = async ({
  req,
  _,
}: {
  req: any;
  _: any;
}): Promise<ApolloContext> => {
  const regex = /Bearer (.+)/i;
  let user: User | null = null;

  if (req.headers.authorization) {
    const { authorization, ...headers } = req.headers;
    const idToken = authorization.match(regex)?.[1];

    if (idToken) {
      const token = await auth.verifyIdToken(idToken);

      user = await prisma.user.findUnique({
        where: {
          id: token.uid,
        },
      });
    }
  }

  return {
    user,
    prisma,
  };
};
