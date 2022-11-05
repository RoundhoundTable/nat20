import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { CharactersList } from "../components/CharactersList";
import { EModals } from "../enums/modals";
import { useAuth } from "../hooks/useAuth";
import useModal from "../hooks/useModal";

const Home: NextPage = () => {
  const { setModal } = useModal();
  const { currentUser } = useAuth();
  return (
    <>
      <Head>
        <title>Nat20</title>
      </Head>
      <div className="flex flex-col gap-5 md:pt-10 bg-background-500 h-screen justify-between items-center font-poppins">
        {currentUser && <CharactersList />}
        <Image src={Logo} />
        {currentUser ? (
          <div className="flex flex-col pb-10 gap-5 items-center">
            <Button onClick={() => setModal(EModals.JOIN_GAME)}>
              Join Game
            </Button>
            <Button>Create Game</Button>
          </div>
        ) : (
          <div className="flex flex-col pb-10 gap-5 items-center">
            <Button onClick={() => setModal(EModals.LOGIN)}>Login</Button>
            <Button onClick={() => setModal(EModals.REGISTER)}>Register</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
