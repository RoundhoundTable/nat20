import { NextPage } from "next";
import Head from "next/head";
import { DmView } from "../../components/DmView";
import { PlayerView } from "../../components/PlayerView";

const Game: NextPage = () => {
  const DMView = false
  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      {
        DMView
        ? <DmView/>
        : <PlayerView/>
      }
    </>
  );
}

export default Game;