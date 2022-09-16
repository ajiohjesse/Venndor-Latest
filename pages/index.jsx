import Head from "next/head";
import { useEffect, useState } from "react";
import Featured from "../components/Featured";
import RecentlyAdded from "../components/RecentlyAdded";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingImage from "../components/ui/LoadingImage";
import LoadingText from "../components/ui/LoadingText";
import Spinner from "../components/ui/Spinner";
import Toggler from "../components/ui/Toggler";

export default function Home() {
  const [active, setActive] = useState(false);
  return (
    <>
      <Head>
        <title>Venndor - The Online Marketplace</title>
      </Head>

      <Featured />
      <RecentlyAdded />
    </>
  );
}
