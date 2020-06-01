import React from "react";
import 'react-native-gesture-handler';
import Home from "./src/screen/Home/index";
import Login from "./src/screen/Login/index";
import SignUp from "./src/screen/SignUp/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (

    <NavigationContainer >
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="none"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;
// export default createAppContainer(AppNavigator);
// @react-native-community/masked-view