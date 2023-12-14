// import * as React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Logo } from '../FirebaseAuth/components';
import { Images, Colors} from '../FirebaseAuth/config';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo uri={Images.logo} />
        <Text style={styles.screenTitle}>Create a new account!</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}         
          placeholder="Nhập Mật khẩu"
          onChangeText={(password) => setPassword(password)}
          
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Registration")} style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Bạn chưa có tài khoản? Đăng ký tại đây
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword1")} style={{ marginTop: 10 }}>
      {/* <TouchableOpacity onPress={() => forgotPassword(email)} style={{ marginTop: 10 }}> */}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Quên mật khẩu!!</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 2,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  logoContainer: {
    alignItems: 'center'
  },  
});
