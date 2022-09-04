import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { auth } from "../libs/firebaseApp";
import { setContext } from "@apollo/client/link/context";
import AuthProvider from "../context/AuthProvider";
import SocketProvider from "../context/SocketProvider";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const getIdToken = async () => await auth.currentUser?.getIdToken();

const authLink = setContext(async (_, { headers }) => {
  const token = await getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Bypass-Tunnel-Reminder": true,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
