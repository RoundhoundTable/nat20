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
import Head from "next/head";
import ModalProvider from "../context/ModalProvider";

const httpLink = new HttpLink({
  uri: "/api/graphql",
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
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={client}>
        <AuthProvider>
          <SocketProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </SocketProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
