import { FirebaseError } from "firebase/app";
import { ZodError, ZodIssue } from "zod";
import { Nat20Error } from "../utils/Nat20Error";
import { firebaseErrors } from "../validation/errorMessages";

export const formatError = (_error: Error): Nat20Error[] => {
  let formattedError: Nat20Error[] = [];

  let error: Error | Nat20Error[] = _error;

  if (!(error instanceof ZodError))
    error = JSON.parse(error.message) as Nat20Error[];

  if (Array.isArray(error) && error instanceof Array<Nat20Error>) {
    error.forEach((err) => {
      formattedError = {
        ...formattedError,
        [err.field]: err.message,
      };
    });
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
