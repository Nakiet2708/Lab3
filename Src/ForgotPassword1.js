import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { firebase } from "../config";

const ForgotPassword1 = () => {
  const [email, setEmail] = useState("");

  const changePassword = () => {
    if (email.trim() === "") {
      alert("Vui lòng nhập địa chỉ email");
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Thay đổi mật khẩu");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (email.trim() !== "") {
      firebase
        .firestore()
        .collection("gmail")
        .doc(email)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            // setName(snapshot.data()); // Nếu bạn muốn sử dụng state để lưu trữ dữ liệu
            console.log(snapshot.data()); // Đưa dữ liệu vào state hoặc xử lý dữ liệu tùy ý
          } else {
            console.log("Gmail không tồn tại");
          }
        })
        .catch((error) => {
          console.error("Lỗi khi truy cập Firestore:", error);
        });
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity onPress={changePassword} style={styles.button}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Đổi mật khẩu</Text>
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
});

export default ForgotPassword1;




// import React, { useState } from 'react';
// import { StyleSheet, Text } from 'react-native';
// import { Formik } from 'formik';
// import { firebase } from "../config";
// import { passwordResetSchema } from '../FirebaseAuth/utils';
// import { Colors } from '../FirebaseAuth/config';
// import { View, TextInput, Button, FormErrorMessage } from '../FirebaseAuth/components';

// export const ForgotPasswordScreen = () => {
// const [errorState, setErrorState] = useState('');
// const handleSendPasswordResetEmail = values => {
// const { email } = values;
// firebase.auth().sendPasswordResetEmail(email)
// .then(() => {
// console.log('Success: Password Reset Email sent.');
// })
// .catch(error => setErrorState(error.message));
// };
// return (
// <View isSafe style={styles.container}>
// <View style={styles.innerContainer}>
// <Text style={styles.screenTitle}>Reset your password</Text>
// </View>
// <Formik
// initialValues={{ email: '' }}
// validationSchema={passwordResetSchema}
// onSubmit={values => handleSendPasswordResetEmail(values)}
// >
// {({
// values,
// touched,
// errors,
// handleChange,
// handleSubmit,
// handleBlur
// }) => (
// <>
// {/* Email input field */}
// <TextInput
// name='email'
// leftIconName='email'
// placeholder='Enter email'
// autoCapitalize='none'
// keyboardType='email-address'
// textContentType='emailAddress'
// value={values.email}
// onChangeText={handleChange('email')}
// onBlur={handleBlur('email')}
// />
// <FormErrorMessage error={errors.email} visible={touched.email} />
// {/* Display Screen Error Mesages */}
// {errorState !== '' ? (
// <FormErrorMessage error={errorState} visible={true} />
// ) : null}
// {/* Password Reset Send Email button */}
// <Button style={styles.button} onPress={handleSubmit}>
// <Text style={styles.buttonText}>Send Reset Email</Text>
// </Button>
// </>
// )}
// </Formik>
// {/* Button to navigate to Login screen */}
// <Button
// style={styles.borderlessButtonContainer}
// borderless
// title={'Go back to Login'}
// onPress={() => {} }
// />
// </View>
// );
// };
// const styles = StyleSheet.create({
// container: {
// flex: 1,
// backgroundColor: Colors.white,
// paddingHorizontal: 12
// },
// innercontainer: {
// alignItems: 'center'
// },
// screenTitle: {
// fontSize: 32,
// fontWeight: '700',
// color: Colors.black,
// paddingTop: 20
// },
// button: {
// width: '100%',
// justifyContent: 'center',
// alignItems: 'center',
// marginTop: 8,
// backgroundColor: Colors.orange,
// padding: 10,
// borderRadius: 8
// },
// buttonText: {
// fontSize: 20,
// color: Colors.white,
// fontWeight: '700'
// },
// borderlessButtonContainer: {
// marginTop: 16,
// alignItems: 'center',
// justifyContent: 'center'
// }
// });