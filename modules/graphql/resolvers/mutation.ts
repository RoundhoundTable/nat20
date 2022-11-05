import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";
import LoginMutationHandler from "../handlers/mutation/LoginMutationHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
};

export default mutationResolver;
