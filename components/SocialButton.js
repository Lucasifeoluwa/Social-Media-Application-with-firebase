import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight } from "../utils/Dimensions";
import { FontAwesome } from "@expo/vector-icons";

function SocialButton({ backgroundColor, color, icon, title, ...rest }) {
  let bgColor = backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome name={icon} style={styles.icon} color={color} size={22} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.tit, { color: color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnTxtWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2e64e5",
  },

  icon: {
    fontWeight: "bold",
  },

  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  tit: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
});

export default SocialButton;
