import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";
import LoginMutationHandler from "../handlers/mutation/LoginMutationHandler";
import DeleteCharacterHandler from "../handlers/mutation/DeleteCharacterHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
  deleteCharacter: DeleteCharacterHandler,
};

export default mutationResolver;
