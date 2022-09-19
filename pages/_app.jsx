import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Venndor - The Online Marketplace</title>
      </Head>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Toaster />

            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
