import { FirebaseError } from "firebase/app";
import { ZodError, ZodIssue } from "zod";
import { Nat20Error } from "../utils/Nat20Error";
import { firebaseErrors } from "../validation/errorMessages";

export const formatError = <T>(error: Error): Nat20Error[] => {
  let formattedError: Nat20Error[] = [];

  if (error instanceof FirebaseError) {
    formattedError = firebaseErrors[error.code];
  }
  if (error instanceof ZodError) {
    error.errors.forEach((err: ZodIssue) => {
      let error: Nat20Error | Nat20Error[] = new Nat20Error(
        err.path[0] as string,
        err.message
      );

      if (err.path.length > 1)
        error = new Nat20Error(err.path.join("."), err.message);

      formattedError = formattedError.concat(error);
    });
  }

  return formattedError;
};
