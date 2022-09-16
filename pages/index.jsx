import Head from "next/head";
import { useEffect, useState } from "react";
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

      <section className="section">
        <div className="container">
          <button onClick={() => setTheme(inactiveTheme)}>change theme</button>
          <Toggler active={active} onClick={() => setActive(!active)} />
          <div className="card">
            <Input label="Name" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quod impedit numquam quaerat beatae sit officia hic.
            <div className="image">
              <LoadingImage />
            </div>
            <div>
              <LoadingText />
              <LoadingText />
              <LoadingText />
              <LoadingText sm />
            </div>
            <Button color="primary">
              <Spinner size="sm" />
              Loading
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
