import { Character } from "@prisma/client";
import { Socket } from "socket.io";

class Room {
  public readonly id: string;
  public readonly password: string;
  private dungeonMaster: Socket | undefined = undefined;
  private players: Map<Socket, Character> = new Map();

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }

  joinAsDm(socket: Socket) {
    this.dungeonMaster = socket;
    socket.join(this.id);
  }

  async join(socket: Socket, password: string, character: Character) {
    if (password !== this.password) return false;
    if (this.players.get(socket)) return false;

    socket.join(this.id);
    this.players.set(socket, character);
    // TODO: SET SOCKET TO CHARACTER
    return true;
  }

  disconnect(socket: Socket) {
    if (this.players.get(socket)) {
      this.players.delete(socket);
    }
    if (this.dungeonMaster === socket) {
      console.log("dungeon master left");
    }
  }
}

export default Room;
