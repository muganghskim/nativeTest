import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RecoilRoot } from "recoil";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

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
    <RecoilRoot>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "홈" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "로그인" }}
            />
            <Stack.Screen
              name="Register"
              component={SignupScreen}
              options={{ title: "회원가입" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
