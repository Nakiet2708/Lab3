import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Registration from "./Src/Registration";
import Login from "./Src/Login";
import Dashboard from "./Src/Dashboard";
import Header from "./component/Header";
import ForgotPassword1 from "./Src/ForgotPassword1"
// import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Trang Đăng Nhập"
          component={Login}
          options={{
            headerTitle: () => <Header name="Đăng nhập" />,
            headerStyle: {
              height: 200,
              borderBottomLeftRadius: 50,
              borderBottomRightRadiusBottom: 50,
              backgroundColor: "#fff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="Trang Đăng Ký"
          component={Registration}
          options={{
            header: () => <Header name="Đăng ký" />,
            headerStyle: {
              height: 200,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#fff",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
        name="ForgotPassword1"
        component={ForgotPassword1}
        options={{
          headerTitle: {
            height: 200,
            borderBottomLeftRadius: 50,
            borderBottomRightRadiusBottom: 50,
            backgroundColor: "#fff",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />
      </Stack.Navigator>
      
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: {
            height: 200,
            borderBottomLeftRadius: 50,
            borderBottomRightRadiusBottom: 50,
            backgroundColor: "#fff",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}