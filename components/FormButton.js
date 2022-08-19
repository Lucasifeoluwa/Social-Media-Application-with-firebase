import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight } from "../utils/Dimensions";

function FormButton({ title, ...rest }) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.tit}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2e64e5",
  },

  tit: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
});

export default FormButton;
