import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";

import SocialButton from "../components/SocialButton";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function LoginScreen(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
        }
      );
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Chatify</Text>

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

      <FormButton title="Sign In" onPress={handleLogin} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>forgot Password?</Text>
      </TouchableOpacity>

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
        onPress={() => navigation.navigate("Sign")}
      >
        <Text style={styles.navButtonText}>Dont have an account? Sign Up</Text>
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
});

export default LoginScreen;
