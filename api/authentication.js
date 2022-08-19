import React, { useContext, useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthContext from "../Storage/context";

const regUsers = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      }
    );
  } catch (error) {
    alert(error);
  }
};

const logInUsers = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        console.log(user.uid);
      }
    );
  } catch (error) {
    alert(error.message);
  }
};

export default {
  regUsers,
  logInUsers,
};
