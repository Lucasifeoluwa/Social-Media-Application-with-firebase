import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { auth } from "./config/firebase";
import Storage from "./Storage/Storage";
import AppNavigator from "./navigation/AppNavigator";
import AuthContext from "./Storage/context";
import AuthNavigator from "./navigation/AuthNavigator";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await Storage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await restoreUser();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  /*  useEffect(() => {
    restoreToken();
  }, []); */

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
