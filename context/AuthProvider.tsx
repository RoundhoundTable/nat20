import {
  getAuth,
  signInWithCustomToken,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IAuthContext } from "../interfaces/context";
import { IUser } from "../interfaces/entities";
import { useApolloClient, gql } from "@apollo/client";
import app from "../libs/firebaseApp";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = (token: string) => {
    return signInWithCustomToken(app.auth, token);
  };

  const signOut = (): any => {
    return firebaseSignOut(app.auth);
  };

  const signUp = (token: string) => {
    return signInWithCustomToken(app.auth, token);
  };

  const fetch = async () => {
    const { data } = await client.query({
      query: gql`
        query {
          _user {
            uid
            username
          }
        }
      `,
    });

    if (data) setCurrentUser(data._user);
  };

  useEffect(() => {
    const unsubscribe = app.auth.onAuthStateChanged(async (user) => {
      await fetch();
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signOut,
    signUp,
    fetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
