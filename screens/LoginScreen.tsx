import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { login } from "../recoil/atoms/auth"; // 실제 파일 경로로 수정해주세요.
import { useSetRecoilState } from "recoil";
import { userState, isLoggedInState } from "../recoil/atoms/auth"; // userState와 isLoggedInState를 정의한 파일 경로로 수정해주세요.

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleChange = (name: any, value: String) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const loggedInUser = await login(formData);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Log in to Coffee Shop</Text>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => handleChange("userId", value)}
          value={formData.userId}
          placeholder="아이디"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
      </View>

      <Button title="로그인" onPress={handleSubmit} color="#8c6b52" />

      <Text style={styles.forgotPassword}>비밀번호를 잊으셨나요?</Text>

      <Button
        title="아이디로 회원가입"
        onPress={() => navigation.navigate("Register")}
        color="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    padding: 20
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#371c07",
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 10
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
  forgotPassword: {
    color: "gray",
    textDecorationLine: "underline",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center"
  }
});

export default LoginScreen;
