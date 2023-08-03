import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Explore: undefined;
  Register: undefined;
};

export type { RootStackParamList };

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "홈",
              headerRight: () => (
                <Button
                  title="로그인"
                  onPress={() => navigation.navigate("Login")}
                />
              )
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "로그인" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
