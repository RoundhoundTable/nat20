import type { NextPage } from "next";
import Image from "next/image";
import Logo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { CharactersList } from "../components/CharactersList";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col p-5 bg-[#343642] h-screen justify-center">
    <CharactersList/>
      <Image src={Logo} />
      <div className="mt-28 flex flex-col p-10 gap-5 items-center">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
};

export default Home;
