import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { firebase } from "../config";

const Dashboard = () => {
  const [name, setName] = useState([]);

const changePassword = () =>{
  firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
  .then(()=>{
    alert("Thay đổi mật khẩu")
  }).catch((error)=>{
    alert(error)
  })
}

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("Người dùng không tồn tại");
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Chào mừng bạn {name.firstName} đến với...
      </Text>
      <TouchableOpacity
        onPress={()=> changePassword()}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Mật khẩu mới!!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> firebase.auth().signOut()}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
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

export default Dashboard;
