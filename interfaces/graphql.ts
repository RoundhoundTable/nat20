export interface IRegisterMutationInput {
  credentials: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export interface ILoginMutationInput {
  credentials: {
    email: string;
    password: string;
  };
}
