export const firebaseErrors: Record<string, any> = {
  "auth/user-not-found": [
    {
      field: `email`,
      message: `Email not registered.`,
    },
  ],
  "auth/too-many-requests": [
    {
      field: `email`,
      message: `There are too many request right now, try later.`,
    },
    {
      field: `password`,
      message: `There are too many request right now, try later.`,
    },
  ],
  "auth/email-already-in-use": [
    {
      field: `email`,
      message: `The email is already in use.`,
    },
  ],
  "auth/wrong-password": [
    {
      field: `email`,
      message: `Invalid Credentials.`,
    },
    {
      field: `password`,
      message: `Invalid Credentials.`,
    },
  ],
};

export const zodMessages = {
  INVALID_EMAIL: `Enter a valid email.`,
  PASSWORD_MIN_CHAR: `The password must have at least 6 characters.`,
  EMPTY_FIELD: `The field cannot be empty.`,
  NO_ALPHANUM: `Must only contain characters [a-zA-Z0-9] .`,
  PASSWORD_MISMATCHING: `The passwords don't match.`,
  MIN_CHAR: `Must have at least 1 character.`,
  NUMBER_MIN: `The value must be equal or greater than 0.`,
  NUMBER_MAX: `The value must be equal or less than 30.`,
  ID_WRONG_LENGTH: `The ID must be 8 characters long.`,
};
