import type {
  CollectionGroup,
  DocumentReference,
  Timestamp,
} from "firebase-admin/firestore";

export interface IUser {
  uid: string;
  username: string;
  characters?: DocumentReference[];
}

export interface ICampaign {
  uid: string;
  dungeon_master: DocumentReference | IUser;
  last_session: Timestamp;
  password: string;
  title: string;
  characters: DocumentReference[] | ICampaignCharacter[];
}

export interface ICampaignCharacter {
  uid: string;
  character: DocumentReference | ICharacter;
  death_throws: (number | null)[];
  equipment: { item: string; quantity: number }[];
  hit_points: number;
  is_dead: boolean;
  purse: any;
  spell_slots: Map<string, number>;
}

export interface ICharacter {
  uid: string;
  class: string;
  classArmor: number;
  hitPoints: number;
  initiative: number;
  level: number;
  name: string;
  picture: string;
  proficiencyBonus: number;
  speed: number;
  spellSlots: Map<string, number>;
  spells: string[];

  user: DocumentReference | IUser;
}
