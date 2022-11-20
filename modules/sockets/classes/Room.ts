import { Socket } from "socket.io";
import { ICharacter } from "../../../interfaces/entities";

class Room {
  public readonly id: string;
  private readonly password: string;
  public dungeonMaster: Socket | undefined = undefined;
  public players: Map<string, ICharacter> = new Map();

  constructor(id: string, password: string, dungeonMaster: Socket) {
    this.id = id;
    this.password = password;
    this.dungeonMaster = dungeonMaster;
    dungeonMaster.join(this.id);
  }

  async join(socket: Socket, password: string, character: ICharacter) {
    if (password !== this.password) return false;
    if (this.players.get(socket.id))
      throw new Error("Socket already in the room");

    socket.join(this.id);

    this.players.set(socket.id, character);

    return true;
  }

  disconnect(socket: Socket) {
    if (this.players.get(socket.id)) {
      this.players.delete(socket.id);
    }
    if (this.dungeonMaster === socket) {
      console.log("dungeon master left");
    }
  }

  updateCharacter(socketId: string, payload: ICharacter) {
    const character = this.players.get(socketId);

    if (!character) throw Error("Character not found");

    this.players.set(socketId, payload);
  }

  get() {
    const serializePlayers = () => {
      let output: Record<string, ICharacter> = {};

      this.players.forEach((value, key) => {
        output[key] = value;
      });

      return output;
    };

    return {
      id: this.id,
      dungeonMaster: this.dungeonMaster?.id,
      players: serializePlayers(),
    };
  }
}

export default Room;
