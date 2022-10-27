import { Campaign, CampaignCharacter } from "@prisma/client";
import { Socket } from "socket.io";

class Room {
  public readonly id: string;
  public readonly campaign: Campaign;
  private dungeonMaster: Socket | undefined = undefined;
  private players: Map<Socket, CampaignCharacter> = new Map();

  constructor(id: string, campaign: Campaign) {
    this.id = id;
    this.campaign = campaign;
  }

  joinAsDm(socket: Socket) {
    this.dungeonMaster = socket;
    socket.join(this.id);
  }

  async join(socket: Socket, password: string, character: CampaignCharacter) {
    if (password !== this.campaign.password) return false;
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
