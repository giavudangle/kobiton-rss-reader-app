import React from 'react';
import {ROUTES} from './RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup'
type AuthStackParamsList = {
  [ROUTES.LOGIN]: undefined,
  [ROUTES.SIGNUP]: undefined,

}

export default function AuthStack() {
  const Stack = createNativeStackNavigator<AuthStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}/>
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen}/>

    </Stack.Navigator>
  )
}