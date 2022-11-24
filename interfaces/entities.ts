import { Character, Prisma } from "@prisma/client";

export interface IUser {
  id: string;
  username: string;
}

export interface ICharacter extends Character {
  currentHp: number;
  death_throws: (boolean | null)[];
  stats: Record<string, number> | Prisma.JsonValue;
}
