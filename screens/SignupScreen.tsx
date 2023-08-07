import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { signup } from "../recoil/atoms/auth"; // 실제 파일 경로로 수정해주세요.
import { useSetRecoilState } from "recoil";
import { userState, isLoggedInState } from "../recoil/atoms/auth"; // userState와 isLoggedInState를 정의한 파일 경로로 수정해주세요.

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleSignup = async () => {
    // 회원가입 API 호출 및 회원가입 로직 처리
    try {
      const {
        username: loggedInUsername,
        userId: loggedInUserId,
        token
      } = await signup({ username, userId, password });
      setUser({ username: loggedInUsername, userId: loggedInUserId, token });
      setIsLoggedIn(true);
      console.log(`Signup successful for userId: ${loggedInUserId}`);

      // 여기서 사용자를 다음 화면(예: 메인 화면)으로 이동시킬 수 있습니다.
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="UserId"
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10
  }
});

export default SignupScreen;
