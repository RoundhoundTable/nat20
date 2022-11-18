import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Logo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { CharactersList } from "../components/CharactersList";
import { EModals } from "../enums/modals";
import { useAuth } from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import { useSocket } from "../hooks/useSocket";
import { useWindowSize } from "../hooks/useWindowSize";

const Home: NextPage = () => {
  const {width, height} = useWindowSize()
  const { setModal } = useModal();
  const { currentUser } = useAuth();
  const { socket, initializeSocket } = useSocket();

  useEffect(() => {
    (async () => {
      if (!socket && currentUser) {
        await initializeSocket();
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Nat20</title>
      </Head>
      <div className="flex flex-col md:pt-10 bg-background-500 justify-between items-center font-poppins" style={
        {
          minHeight: `${height}px`
        }
      }>
        {currentUser && <CharactersList />}
        <div className="flex flex-col gap-16 justify-center grow">
          <Image src={Logo} />
          {currentUser ? (
            <div className="flex flex-col pb-10 gap-5 items-center">
              <Button onClick={() => setModal(EModals.JOIN_GAME)}>
                Join Game
              </Button>
              <Button onClick={() => setModal(EModals.CREATE_GAME)}>
                Create Game
              </Button>
            </div>
          ) : (
            <div className="flex flex-col pb-10 gap-5 items-center">
              <Button onClick={() => setModal(EModals.LOGIN)}>Login</Button>
              <Button onClick={() => setModal(EModals.REGISTER)}>Register</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
