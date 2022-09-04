import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ISocketContext } from "../interfaces/context";

export const useSocket = () => {
  return useContext(SocketContext) as ISocketContext;
};
