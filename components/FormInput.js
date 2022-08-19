import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { windowWidth, windowHeight } from "../utils/Dimensions";

function FormInput({ value, label, size, placeholder, ...rest }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconStyle}>
        <MaterialCommunityIcons name={label} color="black" size={size} />
      </View>
      <TextInput
        style={styles.input}
        {...rest}
        value={value}
        placeholder={placeholder}
        numberOfLines={1}
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
    width: "100%",
    marginBottom: 10,
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    width: windowWidth / 1.5,
    height: windowHeight / 1.5,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default FormInput;
