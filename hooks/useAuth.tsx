import { useContext } from "react";
import { IAuthContext } from "../interfaces/context";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext) as IAuthContext;
};
