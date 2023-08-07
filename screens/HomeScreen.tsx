import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRecoilValue } from "recoil";

import { isLoggedInState } from "../recoil/atoms/auth";
import { RootStackParamList } from "../App";

import { logout } from "../recoil/atoms/auth"; // 실제 파일 경로로 수정해주세요.
import { useSetRecoilState } from "recoil";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleClick = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Coffee Shop</Text>
      <Text style={styles.subTitleText}>
        Your one stop shop for artisanal coffee and tea.
      </Text>
      <Button
        title="Explore"
        onPress={() => navigation.navigate("Explore")}
        color="#8c6b52"
      />
      {isLoggedIn ? (
        <View style={styles.buttonContainer}>
          <Button
            title="로그아웃"
            onPress={() => handleClick()}
            color="#8c6b52"
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={() => navigation.navigate("Login")}
            color="#8c6b52"
          />
        </View>
      )}
      {/* 추천 상품 리스트는 나중에 추가하기 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#371c07",
    marginBottom: 10
  },
  subTitleText: {
    fontSize: 16,
    color: "#8c6b52",
    textAlign: "center",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default HomeScreen;
