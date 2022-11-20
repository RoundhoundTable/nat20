import { z } from "zod";
import { zodMessages } from "./errorMessages";

export const joinRoomSchema = z.object({
  id: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(8, {
      message: zodMessages.ID_WRONG_LENGTH,
    })
    .max(8, {
      message: zodMessages.ID_WRONG_LENGTH,
    }),
  password: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.EMPTY_FIELD,
  }),
  characterId: z
    .string({
      required_error: zodMessages.EMPTY_FIELD,
    })
    .uuid(),
});

export const createRoomSchema = z.object({
  password: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.EMPTY_FIELD,
  }),
});
