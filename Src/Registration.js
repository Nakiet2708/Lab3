import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { firebase } from "../config";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "test-3bfff.firebaseapp.com",
          })
          .then(() => {
            alert("Gửi email xác minh");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error => {
        alert(error.message);
      }));
  };
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="firstName"
        onChangeText={(firstName) => setFirstName(firstName)}
        autoCorrect={false}
      />
      <TextInput
        style={styles.textInput}
        placeholder="lastName"
        onChangeText={(lastName) => setLastName(lastName)}
        autoCorrect={false}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-adress"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Nhap password"
        onChangeText={(password) => setPassword(password)}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
      />

      <TouchableOpacity
      onPress={() => registerUser(email, password, firstName, lastName)} 
      style={styles.button}
      >
        <Text style={{fontWeight:"bold", fontSize:22}}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginbottom: 10,
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
});


export default Registration;
