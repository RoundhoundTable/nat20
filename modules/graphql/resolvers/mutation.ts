import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";
import LoginMutationHandler from "../handlers/mutation/LoginMutationHandler";
import DeleteCharacterHandler from "../handlers/mutation/DeleteCharacterHandler";
import CreateCharacterHandler from "../handlers/mutation/CreateCharacterHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
  deleteCharacter: DeleteCharacterHandler,
  createCharacter: CreateCharacterHandler,
};

export default mutationResolver;
