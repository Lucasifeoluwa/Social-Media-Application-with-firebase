import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";

import AddPostScreen from "../screens/AddPostScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerTitleAlign: "center",
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: "Edit Profile",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const FeedNaviagtor = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RN Social"
      component={HomeScreen}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontFamily: "Roboto",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <FontAwesome5.Button
              name="plus"
              size={20}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate("AddPost")}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontFamily: "Roboto",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#2e64e515",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Text
              style={{
                color: "#2e64e5",
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Post
            </Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={AccountScreen}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedNaviagtor}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={({ route }) => ({
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
