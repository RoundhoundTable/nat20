import { NextPage } from "next";
import Head from "next/head";
import { DmView } from "../../components/DmView";
import { PlayerView } from "../../components/PlayerView";
import useGame from "../../hooks/useGame";

const Game: NextPage = () => {
  const { isDm } = useGame();
  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      {isDm ? <DmView /> : <PlayerView />}
    </>
  );
};

export default Game;
