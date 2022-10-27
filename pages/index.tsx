import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { CharactersList } from "../components/CharactersList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nat20</title>
      </Head>
      <div className="flex flex-col p-5 bg-background-500 h-screen justify-center items-center font-poppins">
        <CharactersList />
        <Image src={Logo} />
        <div className="flex flex-col mt-28 p-10 gap-5 items-center">
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
