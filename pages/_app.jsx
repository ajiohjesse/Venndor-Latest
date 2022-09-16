import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Venndor - The Online Marketplace</title>
      </Head>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
