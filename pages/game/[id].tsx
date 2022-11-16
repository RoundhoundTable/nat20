import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { DmView } from "../../components/DmView";
import { PlayerView } from "../../components/PlayerView";
import useGame from "../../hooks/useGame";
import { useSocket } from "../../hooks/useSocket";

const Game: NextPage = () => {
  const { socket } = useSocket();
  const { room } = useGame();

  if (!room || !socket) Router.push("/");

  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      {room?.dungeonMaster === socket?.id ? <DmView /> : <PlayerView />}
    </>
  );
};

export default Game;
