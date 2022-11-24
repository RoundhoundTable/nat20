import { z } from "zod";

export const createCharacterSchema = z.object({
  name: z.string().min(1),
  race: z.string().min(1),
  class: z.string().min(1),
  picture: z.string().min(1).optional(),
  level: z.string().min(1),
  initiative: z.string().min(1),
  proficiencyBonus: z.string().min(1),
  speed: z.string().min(1),
  hitPoints: z.string().min(1),
  classArmor: z.string().min(1),
  stats: z.object({
    STR: z.string().min(1),
    DEX: z.string().min(1),
    CON: z.string().min(1),
    INT: z.string().min(1),
    WIS: z.string().min(1),
    CHA: z.string().min(1),
  }),
});
