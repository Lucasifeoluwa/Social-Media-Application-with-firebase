import React, { useContext } from "react";
import AuthContext from "./context";
import storage from "./Storage";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (userCred) => {
    setUser(userCred);
    storage.storeToken(userCred);
  };

  const logOut = () => {
    signOut(auth);
    storage.removeToken();
  };

  return { user, logIn, logOut };
};

export default useAuth;
