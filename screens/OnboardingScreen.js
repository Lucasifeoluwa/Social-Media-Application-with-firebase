import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const Dot = ({ selected }) => {
  let backgroundColor;
  let width;

  width = selected ? 10 : 7;
  backgroundColor = selected ? "black" : "grey";

  return (
    <View
      style={{
        width,
        height: selected ? 10 : 7,
        borderRadius: selected ? 5 : 3.5,
        backgroundColor,
        marginHorizontal: 5,
      }}
    />
  );
};

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginRight: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

function OnboardingScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Onboarding
        DotComponent={Dot}
        DoneButtonComponent={Done}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: "#a6e4d0",
            image: <Image source={require("../assets/onboarding1.png")} />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fdeb93",
            image: <Image source={require("../assets/onboarding2.png")} />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#e9bcbe",
            image: <Image source={require("../assets/onboarding3.png")} />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;
