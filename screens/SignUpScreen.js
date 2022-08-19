import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";

import { auth, db } from "../config/firebase";

function SignUpScreen(props) {
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSignup = async () => {
    const register = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (register) {
      const currentUser = auth.currentUser.uid;
      const newCityRef = doc(collection(db, "user"), currentUser);
      const set = await setDoc(newCityRef, {
        fname: "",
        lname: "",
        email: email,
        createdAt: Timestamp.fromDate(new Date()),
        userImg: null,
      });
      try {
        return set;
      } catch (error) {
        "An Error occured", error;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>

      {loginError && alert("Something went wrong")}

      <FormInput
        value={email}
        onChangeText={(useremail) => setEmail(useremail)}
        placeholder="Email"
        label="email"
        size={24}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        value={password}
        onChangeText={(userpassword) => setPassword(userpassword)}
        placeholder="Password"
        label="lock"
        size={24}
        secureTextEntry
      />
      <FormInput
        value={confirmPassword}
        onChangeText={(userpassword) => setConfirmPassword(userpassword)}
        placeholder="Confirm Password"
        label="lock"
        size={24}
        secureTextEntry
      />

      <FormButton title="Sign Up" onPress={handleSignup} />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our,
        </Text>
        <TouchableOpacity>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        backgroundColor="#e6eaf4"
        color="#4867aa"
        icon="facebook"
        title="Sign In with Facebook"
        onPress={() => {}}
      />
      <SocialButton
        backgroundColor="#f5e7ea"
        color="#de4d41"
        icon="google"
        title="Sign In with Google"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}> Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafd",
    padding: 20,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },

  text: {
    fontFamily: "Roboto",
    marginBottom: 10,
    fontSize: 20,
    color: "#051d5f",
    fontStyle: "italic",
  },

  navButton: {
    marginTop: 15,
  },

  forgotButton: {
    marginVertical: 15,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "#2e64e5",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Roboto",
    color: "grey",
  },
});

export default SignUpScreen;
