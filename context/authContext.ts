import { createContext } from "react";
import { AuthContextType } from "./@types.auth";

export const AuthContext = createContext<AuthContextType>({
  openUnauthorizedModal: false,
  setOpenUnauthorizedModal: (val) => console.log(val),
});
