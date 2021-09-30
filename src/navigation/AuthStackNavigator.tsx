import React from 'react';
import ROUTES_ENUM from './RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup'
type AuthStackParamsList = {
  [ROUTES_ENUM.LOGIN]: undefined,
  [ROUTES_ENUM.SIGNUP]: undefined,

}

export default function AuthStack() {
  const Stack = createNativeStackNavigator<AuthStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES_ENUM.LOGIN}>
      <Stack.Screen name={ROUTES_ENUM.LOGIN} component={LoginScreen}/>
      <Stack.Screen name={ROUTES_ENUM.SIGNUP} component={SignupScreen}/>

    </Stack.Navigator>
  )
}